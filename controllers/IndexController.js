class IndexController {
    static index(req,res){
        res.send('From Index Test');
    }
    static home(req,res){
        res.send('From home in index');
    }
}
module.exports = IndexController;