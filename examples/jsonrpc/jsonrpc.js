/*
 * JSON-RPC 1.0
 * http://json-rpc.org/wiki/specification
 * 
 * Manages RPC-JSON messages
 * 
 * Sample usage:
 * 
 *     var http = require("http"),
 *         RPCHandler = require("./jsonrpc").RPCHandler;
 *
 *     http.createServer(function (request, response) {
 *         if(request.method == "POST"){
 *             new RPCHandler(request, response, RPCMethods, true);
 *         }else{
 *             response.end("Hello world!");
 *         }
 *     }).listen(80);
 * 
 *     RPCMethods = {
 *         insert: function(rpc, param1, param2){
 *             if(param1!=param2)
 *                 rpc.error("Params doesn't match!");
 *             else
 *                 rpc.response("Params are OK!");
 *         },
 *         _private: function(){
 *             // leading underscore makes method private
 *             // and not accessible by public RPC interface
 *         }
 *     }
 * 
 * Sample message traffic:
 * 
 * --> {method:"insert", params: ["value", "other"], id: 1}
 * <-- {result:null, error:"Params doesn't match!", id: 1}
 * 
 * --> {method:"insert", params: ["value", "value"], id: 2}
 * <-- {result:"Params are OK!", error:null, id: 2}
 * 
 */

// + edit to send a version 2.0 field.

exports.RPCHandler = RPCHandler;

/**
 * new RPCHandler(request, response, methods, debug)
 * - request (Object): http.ServerRequest object
 * - response (Object): http.ServerResponse object
 * - methods (Object): available RPC methods. 
 *       methods = {insert: function(rpc, param1, param2, ... paramN){})
 * - debug (Boolean): If TRUE use actual error messages on runtime errors
 * 
 * Creates an RPC handler object which parses the input, forwards the data
 * to a RPC method and outputs response messages.
 **/
function RPCHandler(request, response, methods, debug){
    this.debug = !!debug;
    this.RPCMethods = methods;
    this.HTTPRequest = request;
    this.HTTPResponse = response;
    this.json = false;
    this.id = false;
    
    if(typeof this.RPCMethods=="object" && this.HTTPRequest && this.HTTPResponse){
        // start post body processing
        this._processRequest();
    }else{
        throw new Error("Invalid params");
    }
}

//////////// PUBLIC METHODS ////////////

/**
 * RPCHandler.prototype.error = function(error) -> Boolean
 * - error (String): Error message
 * 
 * Sends an error message if error occured.
 * Returns true if a message was sent and false if blank was sent
 **/
RPCHandler.prototype.error = function(error){
    return this._output(false, error);
}

/**
 * RPCHandler.prototype.response = function(result) -> Boolean
 * - result (String): Response message
 * 
 * Sends the response message if everything was successful
 * Returns true if a message was sent and false if blank was sent
 **/
RPCHandler.prototype.response = function(result){
    return this._output(result, false);    
}

//////////// PRIVATE METHODS ////////////

/**
 * RPCHandler._processRequest() -> undefined
 * 
 * Runs after the initialization. Calls the handler to process request body
 **/
RPCHandler.prototype._processRequest = function(){
    this._post_handler();
}

/**
 * RPCHandler._run() -> undefined
 * 
 * Checks if input is correct and passes the params to an actual RPC method
 **/
RPCHandler.prototype._run = function(){

    if(!this.json)
        return this.error();
    
    if(!this.RPCMethods)
        return this.error("No methods", this.id);
    
    if(!this.json.method || // method name must be set
      this.json.method.substr(0,1)=="_" || // method name cant begin with an underscore
        !this.json.method in this.RPCMethods || // method needs to be inside this.RPCMethods
          typeof this.RPCMethods[this.json.method]!="function") // method needs to be function
        return this.error("Invalid request method", this.id);

    // runs the actual RPC method
    this.RPCMethods[this.json.method].apply(
        this.RPCMethods, [this].concat(this.json.params || []));
}

/**
 * RPCHandler._output(result, error) -> Boolean
 * - result (String): response message
 * - error (String): error message
 * 
 * Creates the response, outputs it and closes the connection.
 * Returns true if a message was sent and false if blank was sent
 **/
RPCHandler.prototype._output = function(result, error){
    this.HTTPResponse.writeHead(error?500:200, {"Content-Type": "application/json"});
    if(typeof this.id=="undefined" || this.id === null){
        this.HTTPResponse.end();
        return false;
    }else{
        this.HTTPResponse.end(JSON.stringify(
            {jsonrpc: "2.0",
            result: error?null:result,
            error: error?error:null,
            id: this.id}
        ));
        return true;
    }
}

/**
 * RPCHandler._post_handler() -> undefined
 * 
 * Checks if request is valid and handles all errors
 */
RPCHandler.prototype._post_handler = function(){
    this.HTTPRequest.setEncoding('utf8');
    var that = this;
    this._post_body_handler(function(body){
        try{
            that.json = JSON.parse(body);
            that.id = that.json && that.json.id;
            that._run();
        }catch(E){
            that.error(that.debug?E.message:"Runtime error", -1);
        }
    });
}

/**
 * RPCHandler._post_body_handler(callback) -> undefined
 * - callback (Function): callback function to be called with the complete body
 * 
 * Parses the request body into one larger string
 */
RPCHandler.prototype._post_body_handler = function (callback){
    var _CONTENT = '';

    this.HTTPRequest.addListener('data', function(chunk){
        _CONTENT+= chunk;
    });

    this.HTTPRequest.addListener('end', function(){
        callback(_CONTENT);
    });
}
