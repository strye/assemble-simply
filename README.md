assemble-simply
===============

A demo of AWS services in the form of a simple meeting tool. The Demo app allows you to manage agendas and track participant feedback.

This Demo is intended to show the art of the possible of what can be done with a minimal (and arguable no) backend code on AWS by usage of the AWS javascript SDK for the browser.


AWS Technologies Used
---------------------
* S3 (storage of the front end pages and code)
* IAM (used in conjunction with Web Identity Federation to authenticate and authorize users)
* Javascript api for the browser
* Dynamo (for data storage)
* SQS (used to queue up and manage user actions)
* Elastic Beanstalk (EC2) used to deploy the backend nodejs applications

Non AWS Technologies Used
-------------------------
* Node js (Socket.io for real-time communications to the client, and also to process the SQS messages)
* Angular js


