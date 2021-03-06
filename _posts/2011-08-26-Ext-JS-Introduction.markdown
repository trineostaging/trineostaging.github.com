---
layout: post
title: "Ext JS 4 - Introduction"
date: 2011-08-26 10:23
comments: false
categories: 
- blog
- extjs
- javascript
styles:
- /css/resources/css/ext-all.css
scripts: 
- /javascripts/ext-all.js
- /javascripts/post_Ext_JS_Introduction.js
---

Author [Matthew Wratt]

Recently we have been working on a project that requires a rich user interface.
We chose to use Ext JS 4 which provides alot of great controls as well as an MVC frame work to manage data on the page.
It can also be easily configured to connect restfully to rails.  

The premise: We need a simple way to assign users to permission groups.
The are three types of permissions "Normal", "Power", "Administrator".
We will display three lists, one for each permission, followed by a list containing all the users that have not been assigned.
Users can only belong to one group and a group can contian many users.

First we need to setup the data models and stores we will require.
We will need a model and store for a person as well as a model for groups.

The model for a person

    // Define a person who can belong to a group
    Ext.define('Person', {

      // Extend the "Ext.data.Model" to get all the handy features that are useful 
      // for a model
      extend: 'Ext.data.Model',

      // Add two fields both with a default type of string
      fields: [
        'name', 
        'position'
      ],

      // Specify the relationship that a person can belong to a group
      belongsTo: 'Group'
    });

The store for people

    // Define a collection of people to store multiple persons
    Ext.define('People', {

      // Extend "Ext.data.Store" to get a bunch of handy features to use with a store
      extend: 'Ext.data.Store',

      // Specify the model for this store "Person"
      model: 'Person'
    });

And the model for a group

    // Define a group which can have many people belonging to it
    Ext.define('Group', {
      extend: 'Ext.data.Model',

      // A group only has one field, "name" which is type string
      fields: [
        'name', 
      ],

      // Specify the relationship that a group can have many people belonging to it
      hasMany: 'Person'
    });

Now that we have defined our data model and a method to display it we can start populating the data model.

    // Create collection of people
    var people = Ext.create('People', {

      // Specify the data for the collection
      data: [
        {name: 'Abhinav Keswani', position: 'Obi Wan'},
        {name: 'Bry Ashman',      position: 'R2D2'},
        {name: 'Daniel Fowlie',   position: 'Lando'},
        {name: 'Jack Galilee',    position: 'Solo'},
        {name: 'Luke McFarlane',  position: 'Luke'},
        {name: 'Matthew Wratt',   position: 'Bobba Fett'},
        {name: 'Morgan Miller',   position: 'Wookie'},
        {name: 'Simon Allman',    position: 'Ewok'}
      ]
    });

We all so need an instance of each of the groups

    // Create groups, Normal, Power, and Administrator
    // Specifying each groups name
    var normal_group = Ext.create('Group', {
      name: 'Normal'
    });

    var power_group = Ext.create('Group', {
      name: 'Power'
    });

    var administrator_group = Ext.create('Group', {
      name: 'Administrator'
    });

We also need a way to display a list of users.

    // Define a grid which can display people and allow dragging and dropping of
    // people into different grids
    Ext.define('PeopleList', {

      // This is an extention of a grid
      extend: 'Ext.grid.Panel',

      // We specify the alias to be used with "xtype"
      // The alias must have "widget." prepended to it to work with "xtype"
      alias: 'widget.peopleGrid',

      // Specify the columns for this grid
      columns: [{
        // Column title
        text: 'Name', 
        // Amount of space to take up
        flex: 1, 
        // Where to get the data from in the model
        dataIndex: 'name'
      }],

      // The drag drop plugin for a grid is added to the grids view,
      // so we specify some configuration for the grid's view
      viewConfig: {
        plugins: {
          ptype: 'gridviewdragdrop',
          dragGroup: 'ddgrids',
          dropGroup: 'ddgrids'
        }
      }
    });

Now we need to put it all together

    // Once the page is ready create and layout the grid views
    Ext.onReady(function() {

      // Create a panel to hold all the grids
      Ext.create('Ext.Panel', {

        // Set the layout to vbox to align the groups on top and the 
        // list of available people on the bottom
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        height: 400,

        // Render this panel to the html element with an id of "example"
        renderTo: Ext.query('#example')[0],

        // Define the items that will be appended to this list
        items: [{
          
          // xtype "panel" is the same is Ext.create with "Ext.Panel" or "Ext.panel.Panel"
          // this is established by specifying alias: "widget.panel" in the definition
          xtype: 'panel',

          // Use a horizontal box layout to layout each group side by side along the top
          layout: {
            type: 'hbox',
            align: 'stretch'
          },

          // "flex" specifies how much space this panel will stretch to fill space
          flex: 1,

          // Set the default "flex" for each of the group grids to be added to this panel
          // Since there are three groups each with a "flex" of 1 they will take up a third
          // of the space each.
          defaults: {
            flex: 1
          },

          // Add each of the groups
          items: [{
            // Normal Group Grid
            xtype: 'peopleGrid',
            title: 'Normal Users',
            // using the normal_group's store of people
            store: normal_group.people()
          }, {
            // Power Group Grid
            xtype: 'peopleGrid',
            title: 'Power Users',
            // using the power_group's store of people
            store: power_group.people()
          }, {
            // Administrator Group Grid
            xtype: 'peopleGrid',
            title: 'Administrators',
            // using the administrator_group's store of people
            store: administrator_group.people()
          }]
        }, {
          // The final grid displays everyone who hasn't been assigned a group
          xtype: 'peopleGrid',
          title: 'Unassigned Users',
          // Using the people store
          store: people,

          // Override the default columns so we can display the person's position as well
          columns: [{
            text: 'Name', 
            flex: 1, 
            dataIndex: 'name'
          }, {
            text: 'Position',
            flex: 1,
            dataIndex: 'position'
          }],

          // Since this grid has a "flex" of 1 and the panel of groups displayed above it
          // has a "flex" of 1 they will each take up half of the space
          flex: 1
        }]
      });
    });


Now users can be dragged into a group.

<div id="example" style="margin-top: 20px;">
</div>

[Matthew Wratt]: http://trineo.co.nz/crew.html#mw
