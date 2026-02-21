try {
 myRoutine() // may throw three types of exceptions
} catch (e) {
    if(e instanceof TypeError) {
        // statements to handle TypeError exceptions
        console.error("Type error:", e.message);
    } else if(e instanceof RangeError) {
        // statements to handle RangeError exceptions
        console.error("Range error:", e.message);
    } else if(e instanceof EvalError) {
        // statements to handle EvalError exceptions
        console.error("Eval error:", e.message);
    }
    else {
        // statements to handle any unspecified exceptions
        console.error("Unexpected error:", e.message);
      logMyErrors(e);
    logMyErrors(e); // pass exception object to error handler
    }
}