require "rubygems"
require "bundler/setup"

## -- Misc Configs, you probably have no reason to changes these -- ##

deploy_default = "_site"
deploy_dir = "."
posts_dir    = "_posts"    # directory for blog files
new_post_ext = "markdown"  # default new post file extension when using the new_post task
new_page_ext = "markdown"  # default new page file extension when using the new_page task

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :generate do
  puts "## Generating Site with Jekyll"
  system "jekyll"
end

desc "Watch the site and regenerate when it changes"
task :watch do
  system "trap 'kill $jekyllPid' Exit; jekyll --auto & jekyllPid=$!; wait"
end

desc "preview the site in a web browser"
task :preview do
  system "trap 'kill $jekyllPid' Exit; jekyll --auto --server & jekyllPid=$!; wait"
end

# usage rake new_post[my-new-post,blog|news|cake|something] or rake new_post['my new post',blog|news|cake|something] or rake new_post (defaults to "new-post" with the blog category)
desc "Begin a new post in #{posts_dir}, eg rake new_post['this is a new post',news|blog|cake|foo]"
task :new_post, :title, :categories do |t, args|
  require './_plugins/titlecase.rb'
  args.with_defaults(:title => 'new-post')
  args.with_defaults(:categories => ['blog'])
  title = args.title.sub(/^'/,'').sub(/'$/,'')
  categories = args.categories.split('|')
  filename = "#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.downcase.gsub(/&/,'and').gsub(/[,'":\?!\(\)\[\]]/,'').gsub(/[\W\.]/, '-').gsub(/-+$/,'')}.#{new_post_ext}"
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;').titlecase}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "comments: false"
    post.puts "categories: "
    categories.each do |category|
      post.puts "- #{category}"
    end
    if categories.include?("news") && !categories.include?("blog")
      post.puts "- blog"
    end
    post.puts "---"
  end
end

#########
# Setup #
#########

desc "Set up your environment"
task :setup do
  system "git remote add staging git@github.com:trineostaging/trineostaging.github.com.git"
  system "sudo gem update --system"
  system "sudo gem install bundler"
  system "sudo bundle install"
end

##############
# Deploying  #
##############

desc "Default deploy task"
task :deploy => "#{deploy_default}" do
end

desc "deploy public directory to staging or production"
task :push, :env do |t, args|
  args.with_defaults(:env => 'staging')
  env = args.env
  puts "## Deploying branch to #{env} "
  case env
  when "staging":
      remote = "staging"
  when "production":
      remote = "origin"
  else
    puts "## FAILED - choose either staging or production environments for deployment."
    exit
  end
  system "cat CNAME-#{env} > CNAME"
  system "git add ."
  system "git add -u"
  puts "\n## Commiting: Site updated at #{Time.now.utc}"
  message = "Site updated at #{Time.now.utc}"
  system "git commit -m '#{message}'"
  puts "\n## Pushing generated website to #{env}"
  system "git push #{remote} master"
  puts "\n## Deploy complete"
end

def ok_failed(condition)
  if (condition)
    puts "OK"
  else
    puts "FAILED"
  end
end

desc "list tasks"
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).to_sentence}"
  puts "(type rake -T for more detail)\n\n"
end
