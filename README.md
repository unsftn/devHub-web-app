# devHub-web-app
<p>
A web application for "devHub", used for recording and announcing events and activities formed around this platform. Implemented using the MEAN stack.
</p>
<p>
In order to start the application you need to remove node_modules and bower_components if they already exists. 
On linux navigate to your project folder:
<br />
<code><b>rm -rf bower_components && rm -rf node_modules</b></code>
</p>
<p>
Then install it again with:
<br />
<code><b>npm install</b></code>
</p>
<p>
You need to install multer in root directory:
<br />
<code><b>npm install multer --save</b></code>
</p>
<p>
You also need to do:
<code><b>bower install</b></code> in <code>packages/custom/article</code> and <code>packages/custom/meetup</code>
and <code><b>npm install</b></code> in <code>packages/custom/files</code>.
</p>
