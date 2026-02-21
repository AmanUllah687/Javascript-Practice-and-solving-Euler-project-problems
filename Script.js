try {
    throw new Error("My Exeception"); // generates an exception

} catch (e) {
     // statements to handle any exceptions
    logMyErrors(e); // pass exception object to error handler
}