function RunCallback(a, b, cb) {
    // Write you code here, you need to add a and b, pass the result into callback function cb as argument return the result
    let sum=a+b
    return cb(sum)
}

module.exports = RunCallback;
