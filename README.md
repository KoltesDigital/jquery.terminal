jquery.terminal
===============

jquery.terminal is a [jQuery](http://jquery.com/) plugin which displays an interactive terminal in your pages.

*It is not a SSH or Linux terminal!* See [Anyterm](http://anyterm.org/) or [Ajaxterm](https://github.com/antonylesuisse/qweb) for that. Instead, jquery.terminal allows you to use custom commands.

I wrote this plugin to easily communicate with my systems without building HTML interfaces. And I wouldn't recommend you to use it as public front-end: the purpose of this plugin is to build administration interfaces.

Even if you don't have this need, you may still like this geeky stuff.

Features
--------

### Customizable

Add custom commands with [listeners](https://github.com/Bloutiouf/jquery.terminal/wiki/Listeners).

The default style displays white texts on black background, you may change it either by editing `jquery.terminal.css` (global change) or by adding CSS in your page. 

### Command flow and operators

[Command flow](https://github.com/Bloutiouf/jquery.terminal/wiki/Command-flow) is the root concept of the terminal. Arguments are values given to a command, which in return gives output values.

[Operators](https://github.com/Bloutiouf/jquery.terminal/wiki/Operators) bind commands together, manipulating arguments and outputs of each two operands. Each operator has its own way to execute commands.

### Context-aware completion

At any moment, press TAB and you will see suggestions which fit well in the context.

### Handles asynchronous requests

Commands can give result either synchronously or asynchronously, which comes in handy when they deal with AJAX requests. Works for completion too!

### Interfaceable with other jQuery plugins

With the [jQuery cookie](https://github.com/carhartl/jquery-cookie) plugin, the command history and variables will be automatically saved and restored. You may need `clear` to erase these variables.

The [jQuery JSON RPC](https://github.com/datagraph/jquery-jsonrpc) plugin provides a built-in listener `jsonrpc` to easily call server-side functions.

Simply include the files before `jquery.terminal.js` and that's it. 

Getting started
---------------

[Try the demo online!](http://bloutiouf.github.com/jquery.terminal)

The [examples](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples) directory contains some examples:

* [cookies.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/cookies.html) shows the independence of different terminals, and to customize CSS
* [github.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/github.html) adds commands to access to [GitHub](https://github.com/)
* [simple.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/simple.html) is a basic example, with examples of commandes

[The wiki](https://github.com/Bloutiouf/jquery.terminal/wiki) contains a lot of additional information. You may be interested in reading:

* How to [integrate the plugin to your site](https://github.com/Bloutiouf/jquery.terminal/wiki/Usage)
* How the [commands](https://github.com/Bloutiouf/jquery.terminal/wiki/Command-flow) and [operators](https://github.com/Bloutiouf/jquery.terminal/wiki/Operators) work

Changelog
---------

### 2.5

* Fixes magic sequences escape.
* Fixes an error with search commands in GitHub example (#1).
* Fixes a missing style with non-fullscreen terminals.
* Fixes mousescroll event propagation (#2, #3).
* Adds an example of non-fullscreen terminal.
* Adds built-in listener `command`.
* Changes arrow style (#2).
* Fixes input problem on WebKit when selecting string (#3).
* Adds built-in listener `jsonrpc` when jQuery JSON RPC is available.
* Adds an example `jsonrpc`.
* Adds the command `sum`.

### 2.4

* Adds action call: `$().terminal(string action, ...)`.
* Replaces execution call with action call `execute`.
* Adds action calls `addListeners`, `removeListeners` and `options`.
* Adds `listeners` and `variables` to the `options`.

### 2.3

* Fixes a compatibility bug with *Internet Explorer* and *Opera*.

### 2.2

* Changes position magic sequence.
* Adds `$LAST` variable.
* Attaches event handlers to prompt and welcome message.
* Adds help link in example `simple.html`.

### 2.1

* Embeds caret plugin, no `jquery.caret.js` file to include anymore.
* Embeds `$.getJSONP`.
* Adds links in help function.
* Puts the links in orange by default.
* `popup` option can be set to null to never show popup.
* Fixes scroll, which now works only if the cursor is over the terminal.

### 2.0

Considered as the first version, you don't want to see version 1 :)

Acknowledgments
---------------

Warm thanks to [shitwizard](https://github.com/shitwizard) improving the plugin.

Refer to links to issues within the changelog or commit messages.

Misc
----

Licensed under a MIT license, see the [LICENSE file](https://github.com/Bloutiouf/jquery.terminal/blob/master/LICENSE).

Uses the [jQuery caret plugin](http://code.google.com/p/jcaret/) by C. F., Wong ([Cloudgen Examplet Store](http://cloudgen.w0ng.hk)), licensed under MIT license.

Official site: https://github.com/Bloutiouf/jquery.terminal
