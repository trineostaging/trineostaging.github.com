---
layout: post
title: "Connecting Xero and Salesforce.com using Dime"
date: 2011-08-24 14:36
categories: 
- blog
---

Author [Jack Galilee](http://trineo.co.nz/crew.html#jg)

I've been working on Dime since January this year. We've recently added public authentication to [Dime for Developers](http://appexchange.salesforce.com/listingDetail?listingId=a0N30000003J4HdEAK) and I thought that it'd be good to put up an example about how to use the functionality.

Because of the way Salesforce is structured the code is highly coupled and as I wrote the tutorial it started to quickly resemble a tome rather than an agile tutorial. In order to remedy this (I hope) I've included the code with nice comments all over it explaining how each bit links to each other bit.

The only bit I need to explain is how to set up your Xero development account for the awesome public application you're going to be writing.

I'm assuming that you've got a Xero account and are familiar with using the Xero API. If you've not played with it before then visit api.xero.com.

The first thing to do is to register a public application. Go to api.xero.com, login, click 'My Applications' then click 'Add New Application'.

Type in an application name, you can use anything you want; I'm going to use Tutorial1. It is important that you add in a callback domain. Since we're using Salesforce, you need to enter salesforce.com as the callback domain, however, if you want to redirect your users elsewhere later enter that domain. Note that if you're in a development org you're going to need to enter force.com.

What is the callback domain? The callback domain is used by Xero to ensure someone hasn't hijacked your callback parameter in your HTTP request. If you try and send a request with a callback URL with a domain that is not the same as your configured application above, Xero will not verify your credentials.

Now you should have something like what I've described above entered into Xero, click Save and you are done with Xero for the moment.

Now check out the following code.  If you copy and paste it into your org, changing three lines in the PublicAuthenticateController class, you can start using the example and work backwards if you wish. Otherwise my awesome comments should assist.

### PublicAuthenticationController.apx
    // Controller for the page we're going to use to do the authentication.
    public with sharing class PublicAuthorisationController {
      
      // Information for creating the credentials set.
      private static String CONSUMER_KEY { get { return 'YOUR_CONSUMER_KEY'; } }
      private static String CONSUMER_SECRET { get { return 'YOUR_CONSUMER_SECRET'; } }
      
      // Credentials for the public authentication.
      public sfXero.XeroCredentials credentials { get; set; }
      
      // Link to Xero to confirm the public authentication.
      public String oauthLink { get; set; }
      
      // Called by the authorise pages, page element action="{!prepareOAuthLink}" attribute. 
      // ### Neccessary because webservice callouts cannot be performed in constructors.
      public void getOAuthLink() {
        
        // Create the credentials for public authentication.
        this.credentials = new sfXero.XeroCredentials(CONSUMER_KEY, CONSUMER_SECRET, '', '');
        
        // Ensure we redirect to the verification page.
        this.credentials.oauthcallback = 'https://.../apex/PublicVerificationPage';
        this.credentials.generateRequestTokens();
        
        // Get the authorisation link for opening the popup. 
        this.oauthLink = credentials.authorisationLink;
        
      }
      
      // Standard method for passing parameters from Visual force action functions.
      public String oauthVerifier { get; set; }
      
      // Given the verifier swap it for the access token.
      // ## Result of this action is found inside the credentials object.
      // #### If anything goes wrong and exception is thrown.
      public void getAccessToken() {
        this.credentials.oauthVerifier = this.oauthVerifier;
        this.credentials.swapVerifier();
      }
      
      
      
      // XML for the invoice response from Xero.
      public String rawInvoiceResponse { get; set; }
      
      // Get all of the invoices from 
      public void getInvoices() {
        sfXero.XeroInvoiceResponse xir = sfXero.XeroAPI.getInvoicesAll(this.credentials, System.now(), '', '');
        rawInvoiceResponse = xir.xmlResponse;
      }
      
    }

### PublicAuthenticationPage.xml

    <apex:page controller="PublicAuthorisationController" action="{!getOAuthLink}">
      <apex:form >
        
        <!-- Opens a popup window for the user to login to Xero. -->
        <script type="text/javascript">
          function authenticateXero() {
            var wind = window.open("{!oauthLink}", "XeroAuthentication", 
              "status = 1, height = 800, width = 600, resizable = 0");
          }
        </script>
        
        <!-- Called by the PublicVerificationPage to run the get the access token. -->
        <!-- ## Last method that needs calling for verification to be complete. -->
        <apex:actionFunction name="getAccessToken" action="{!getAccessToken}" oncomplete="" rerender="Output">
          <apex:param id="oauthVerifier" name="oauthVerifier" assignTo="{!oauthVerifier}" value=""/>
        </apex:actionFunction>
        
        <!-- Usable portion of the example, results will be displayed here -->
        <apex:sectionHeader title='Public Authorisation Example' />
        <apex:pageBlock title='Example of using public authorisation.'>
          <apex:pageBlockSection>
            
            <!-- Need a button to start the popup -->
            <apex:pageBlockSectionItem >
              <apex:outputLabel value='Step 1'/>
              <apex:commandButton value='Authenticate Access' onclick='return authenticateXero();' />
            </apex:pageBlockSectionItem>
            
            <!-- Need a button to perform an action after verification -->
            <apex:pageBlockSectionItem >
              <apex:outputLabel value='Step 2'/>
              <apex:commandButton value='Get Invoices' action='{!getInvoices}' />
            </apex:pageBlockSectionItem>
            
            <!-- Look at what Dimes gives us back -->
            <apex:pageBlockSectionItem >
              <apex:outputLabel value="Step 3 (Result)" />
              <apex:inputTextarea value="{!rawInvoiceResponse}" rows="20" cols="50"/>
            </apex:pageBlockSectionItem>
            
          </apex:pageBlockSection>
        </apex:pageBlock>
        
      </apex:form>
    </apex:page>

### PublicVerificationController.apx

    // Controller for the page we're going to use to verify the information.
    public with sharing class PublicVerificationController {
      
      // Url parameter for the OAuth verifier.
      public static String OAUTH_VERIFIER_KEY { get { return 'oauth_verifier'; } }
      
      // Verifier for public authentication.
      public String oauthVerifier { get; set; }
      
      // Called by the verification pages, page element action="{!getOAuthVerifier}" attribute.
      public void getOAuthVerifier() {
        oauthVerifier = ApexPages.currentPage().getParameters().get(OAUTH_VERIFIER_KEY);
      }
      
    }

### PublicVerificationController.xml

    <apex:page controller='PublicVerificationController' action='{!getOAuthVerifier}'>
      
      <!-- Call the confirm function on the authorization page. -->
      <script type='text/javascript'>
        window.opener.getAccessToken('{!JSENCODE(oauthVerifier)}');
      </script>
      
    </apex:page>
