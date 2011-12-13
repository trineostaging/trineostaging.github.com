---
layout: post
title: "Force.com Migration Toolkit + VIM = Goodbye Force.com IDE!"
date: 2011-12-14 14:45
comments: false
categories: 
- blog
- news
---

Author [Luke McFarlane](http://trineo.co.nz/crew.html#lm)

Up until now I have just about always used the Force.com IDE to retrieve, edit & deploy Apex & Visualforce code (amongst other things). There has always been a part of me, however, that feels a little left out when I see other developers using tools like VIM & GIT. As a Force.com developer I have always wanted a chance to become proficient at using these tools myself (VIM in particular), and before long I found myself looking into ways this might be possible.

As the title of this post suggests, it is indeed possible using the Force.com migration toolkit. The toolkit is available under the Setup -> Develop -> Tools menu in any Salesforce organisation, and it is a command line utility for scripted deployment of application metadata.

The toolkit looks quite powerful in itself, and upon first reading the documentation I noted that certain metadata components such as List Views are available whereas they are not available in Eclipse or changesets. It looks as though this may come in very handy for managing complex migrations & release cycles in the future. For now though, I am focused on learning how to use the toolkit for simple Apex & Visualforce retrieval & deployment.

The Force.com toolkit is Java/ANT-based, and uses XML build files and package files to tell ANT what Salesforce organisation to connect to, and what metadata components should be pushed/pulled. I started out by making an empty project directory to use as a template for new projects. Lets call it 'emptyProject'. My emptyProject directory contains build.properties to store parameters such as username/pass, a 'data' directory containing 'package.xml' (explained later), and the following build.xml file:

	<project name="Retrieve & Deploy all Apex/VF" default="retrieve" basedir="." xmlns:sf="antlib:com.salesforce">

	    <property file="build.properties"/>
	    <property environment="env"/>

	    <!-- Shows retrieving code; only succeeds if done after deploy -->
	    <target name="retrieve">
	      <!-- Retrieve the contents listed in the file data/package.xml into the data directory -->
	      <sf:retrieve username="${sf.username}" password="${sf.password}" serverurl="${sf.serverurl}" retrieveTarget="data" unpackaged="data/package.xml"/>
	    </target>

		<!-- Shows deploying code & running tests for code in directory -->
	    <target name="deploy">
	      <!-- Upload the contents of the "data" directory without running any tests -->
	      <sf:deploy username="${sf.username}" password="${sf.password}" serverurl="${sf.serverurl}" deployRoot="data">
	      </sf:deploy>
	    </target>

	</project>
	

This build file has two targets: "retrieve" & "deploy". The retrieve target retrieves all metadata components as described in "data/package.xml", and the deploy target does exactly the same but deploys all these components to the server. Each of these targets can be run by executing "ant retrieve" or "ant deploy" respectively from the terminal. 

The 'data' directory is where all the code will be placed (e.g. Apex classes will be placed in data/classes). In the data directory there is the following package.xml file:

	<?xml version="1.0" encoding="UTF-8"?>
	<Package xmlns="http://soap.sforce.com/2006/04/metadata">
	    <types>
	        <members>*</members>
	        <name>ApexClass</name>
	    </types>
	    <types>
	        <members>*</members>
	        <name>ApexPage</name>
	    </types>
	    <types>
	        <members>*</members>
	        <name>ApexTrigger</name>
	    </types>
	    <version>23.0</version>
	</Package>

The toolkit is package based, which means that for any target we need to specify the 'package' of metadata components that it will retrieve/deploy. This package.xml file simply says that we want it to retrieve/deploy all (hence the '*') apex classes, triggers and Visualforce pages. Each of these metadata types will end up being stored in their own folders ('classes', 'triggers', 'pages') within the 'data' directory.

Coupled with the VIM editor, I can now retrieve, edit, and deploy Force.com code all within the terminal.. nice! In the future, I hope that I will be able to (with the help of some of my very talented Trineo co-workers!) develop some kind of VIM plugin that allows me to bind a keyboard shortcut to trigger the ANT build script from within VIM. Not to hurry though, I still need to start learning to use VIM (*pulls out vim graphical cheat sheet*)!
