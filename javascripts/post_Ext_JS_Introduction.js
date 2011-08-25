// Define a person who can belong to a group
Ext.define('Person', {

  // Extend the "Ext.data.Model" to get all the handy features that are useful 
  // for a model
  extend: 'Ext.data.Model',

  // Add two fields both with a default type of string
  fields: [
    'name', 
    'email'
  ],

  // Specify the relationship that a person can belong to a group
  belongsTo: 'Group'
});

// Define a collection of people to store multiple persons
Ext.define('People', {

  // Extend "Ext.data.Store" to get a bunch of handy features to use with a store
  extend: 'Ext.data.Store',

  // Specify the model for this store "Person"
  model: 'Person'
});

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

// Create collection of people
var people = Ext.create('People', {

  // Specify the data for the collection
  data: [
    {name: 'Abhinav Keswani', email: 'abhinav.keswani@trineo.co.nz'},
    {name: 'Bry Ashman',      email: 'bry.ashman@trineo.co.nz'},
    {name: 'Daniel Fowlie',   email: 'daniel.fowlie@trineo.co.nz'},
    {name: 'Jack Galilee',    email: 'jack.galilee@trineo.co.nz'},
    {name: 'Luke McFarlane',  email: 'luke.mcfarlane@trineo.co.nz'},
    {name: 'Matthew Wratt',   email: 'matt.wratt@trineo.co.nz'},
    {name: 'Morgan Miller',   email: 'morgan.miller@trineo.co.nz'},
    {name: 'Simon Allman',    email: 'simon.allman@trineo.co.nz'}
  ]
});

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

    height: 500,

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

      // Override the default columns so we can display the person's email address as well
      columns: [{
        text: 'Name', 
        flex: 1, 
        dataIndex: 'name'
      }, {
        text: 'Email',
        flex: 1,
        dataIndex: 'email'
      }],

      // Since this grid has a "flex" of 1 and the panel of groups displayed above it
      // has a "flex" of 1 they will each take up half of the space
      flex: 1
    }]
  });
});
