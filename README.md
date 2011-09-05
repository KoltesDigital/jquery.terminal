jquery.terminal
===============

jquery.terminal is a [jQuery](http://jquery.com/) plugin which displays an interactive terminal in your pages.

*It is not a SSH or Linux terminal!* See [Anyterm](http://anyterm.org/) or [Ajaxterm](https://github.com/antonylesuisse/qweb) for that. Instead, jquery.terminal allows you to use custom commands.

I wrote this plugin to easily communicate with my systems without building HTML interfaces. Even if you don't have this need, you may still like this geeky stuff.

Features
--------

### Customizable

Add custom commands with listeners.

The default style displays white texts on black background, you may change it either by editing `jquery.terminal.css` (global change) or by adding CSS in your page. 

### Command pipelining and other operators

Command pipeling is at the root of this terminal. The principle is very simple: the first command's output is added to the second command's argument list.

Output is therefore like arguments, that is, it is a list rather than a plain text. You should always keep in mind how many elements the commands give as output. For instance, `echo hello world` gives one element (`hello world`) whereas `list hello world` gives two elements (`hello` and `world`).

### Context-aware completion

At any moment, press TAB and you will see suggestions which fit well in the context.

### Handles asynchronous requests

Commands can give result either synchronously or asynchronously, which come in handy when they deal with AJAX requests. Works for completion too. 

### Uses cookie information if jQuery.cookie is available

Simply include `jquery.cookie.js` before `jquery.terminal.js` and that's it. With the cookie plugin, the command history and variables will be automatically saved and restored. You may need `clear` to erase these variables.

Examples
--------

[Test the demo online!](http://bloutiouf.github.com/jquery.terminal)


The [examples](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples) directory contains some examples:

* [cookies.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/cookies.html) shows the independence of different terminals, and to customize CSS
* [github.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/github.html) adds commands to access to [github](https://github.com/)
* [simple.html](https://github.com/Bloutiouf/jquery.terminal/blob/master/examples/simple.html) is a basic example, with examples of commandes

Misc
----

Licensed under a MIT license, see the [LICENSE file](https://github.com/Bloutiouf/jquery.tr/blob/master/LICENSE).

Uses the [jQuery caret plugin](http://code.google.com/p/jcaret/) by C. F., Wong, licensed under MIT license.

Official site: https://github.com/Bloutiouf/jquery.terminal