const doWork = async () => {
    throw new Error("Something went wrong");
    return "Abhijeet";
}

console.log(doWork());

doWork().then((result) => {
    console.log('result: ', result);
}).catch((e) => {
    console.log("error: ", e);
});