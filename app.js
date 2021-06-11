var express = require('express');
var app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
})
);

// register view engine

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(3000);
console.log('Running on port 3000...')

// serving css file
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('home.ejs', { title: 'Home'});
})

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About'});
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs', { title: 'Contact'});
})

app.get('/login', (req, res) => {
  res.render('login.ejs', { title: 'Login'});
})

app.get('/appointment', (req, res) => {
  res.render('appointment.ejs', { title: 'Appointment'});
})

app.get('/index', (req, res) => {
  res.render('index.ejs', { title: 'Index'});
})

app.get('/success', (req, res) => {
  res.render('success.ejs', { title: 'Success'});
})

// app.get('/user', (req, res) => {
//   res.render('user.ejs', { title: 'Check symptoms'});
// })

app.get('/patient', (req, res) => {
  res.render('patient.ejs', { title: 'Patient'});
})

// app.get('/diagnosis', (req, res) => {
//   res.render('diagnosis.ejs', { title: 'Diagnosis'});
// })

// app.post('/diagnosis', (req, res) => {
//   // console.log(req.body); 
//   const data = req.body;
//   console.log(data);
//   res.send("data recieved");
//   // res.render('diagnosis.ejs', { title: 'Diagnosis'});
// })
// BR's post 
app.post("/diagnosis", (req, res) => {
  console.log(req.body);
  // res.send(`the symptoms are ${req.body.symptom}`);
  res.render('diagnosis.ejs', { title: 'Diagnosis'});
});


// app.use(express.json());
// var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var report = require('./model')

//connect to mongoose
// mongoose.connect('mongodb+srv://ash123:ash123@acluster.clkjg.mongodb.net/project?retryWrites=true&w=majority')
const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://ash123:ash123@acluster.clkjg.mongodb.net/project?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected ${conn.connection.host}`);
  };
// var db = mongoose.connection;
connectDB();

// // commented section starts here....
// app.get('/', async (req, res, next) => {
//      const Report = await report.find();
//         console.log(Report);
        
//         var training_data = Report;
//         var problem_to_find = 'cause';
//         var symptoms = ["symp1", "symp2", "symp3"];
//         var dt = new DecisionTree(problem_to_find, symptoms);
//     dt.train(training_data);
//     var predicted_class = dt.predict({
//       symp1: "fever",
//       symp2: "sneezing",
//       symp3: "congestion",
//     });
//     console.log(predicted_class);
//         // console.log(Report);
//         res.status(200).json({ data: Report , count: Report.length, cause:predicted_class});
//   });
 
//     // importing module for decision tree
//     var DecisionTree = require('decision-tree');

// // ends here



// db's function code

app.get('/', async (req, res, next) => {
  res.status(200).send("diagnosis.ejs");
  const Report = await report.find();   
})

function myfunction(data){
  // const Report = await report.find();   
      
      var training_data = Report;
      var problem_to_find = 'cause';
      var symptoms = ['symp1', 'symp2', 'symp3'];
      var dt = new DecisionTree(problem_to_find, symptoms);
  dt.train(training_data);
  var predicted_class = data;
  console.log(predicted_class);
      // console.log(Report);
      res.status(200).json({ data: Report , count: Report.length, cause:predicted_class});
  // importing module for decision tree
  var DecisionTree = require('decision-tree');
  return predicted_class;

  }

// db code ends here


