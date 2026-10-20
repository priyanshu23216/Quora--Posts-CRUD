import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';
import methodOverride from 'method-override';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(methodOverride('_method'));

let users = { 
  [uuidv4()]: {
    username: 'Priyanshu Singh',
    email: "priyanshu.singh@example.com",
    country: "India",
    content : "I am a software developer with a passion for creating innovative solutions. I enjoy working on challenging projects and continuously learning new technologies."
  },

  [uuidv4()]: {
    username: 'Tony Stark',
    email: "tony.stark@example.com",
    country: "USA",
    content : "I am a brilliant inventor and engineer. I use my intelligence and resources to protect the world." 
  },

  [uuidv4()]: {
    username: 'Batman',
    email: "batman@example.com",
    country: "USA",
    content : "I am a vigilante who fights crime in Gotham City. I use my wealth and resources to protect the innocent."
  },

};


app.get('/', (req, res) => {
  res.render('index', { users });
});

app.get('/create', (req, res) => {
  res.render("create");
});

app.get('/:username/:id', (req, res) => {
  const username = req.params.username;
  const userId = req.params.id;
  const user = users[userId];
  res.render('user', { user , username});
});

app.get('/:username/:id/edit', (req, res) => {
  const userId = req.params.id;
  const username = req.params.username;
  const user = users[userId];
  res.render('edit', { user , username , userId});
});

app.patch('/:username/:id/', (req, res) => {
  const userId = req.params.id;
  const { username, email, country, content } = req.body;
  users[userId] = { username, email, country, content };
  res.redirect('/');
});

app.delete('/:username/:id', (req, res) => {
  const userId = req.params.id;
  delete users[userId];
  res.redirect('/');
});

app.post('/add-user', (req, res) => {
  const { username, email, country, content } = req.body;
  const UniqueId = uuidv4(); 
  users[UniqueId] = { username, email, country, content };
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});