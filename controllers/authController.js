const loginPage = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
    }
}



const signUpPage = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    loginPage,
    signUpPage,
}