const { age, date } = require('../../lib/utils');
const member = require('../models/member');
const Member = require('../models/member');

module.exports = {
  index(req, res) {
    Member.all((members) => {
      return res.render('members/index', {
        members,
      });
    });
  },
  create(req, res) {
    Member.instructorsSelectOptions((options) => {
      return res.render('members/create', {
        instructorOptions: options,
      });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Preencher todos os campos!');
      }
    }

    Member.create(req.body, (member) => {
      return res.redirect(`/members/${member.id}`);
    });
  },
  show(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) {
        return res.send('Membro não encontrado!');
      }

      member.birth = date(member.birth).birthDay;
      member.created_at = date(member.created_at).format;

      return res.render('members/show', { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) {
        return res.send('Membro não encontrado!');
      }
      
      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions((options)=>{
        return res.render('members/edit' ,{
          member, 
          instructorOptions: options
        })
      })
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {

      if (req.body[key] == '') {
        return res.send('Preencher todos os campos! xxx');
      }
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`);
    });
  },
  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`);
    });
  },
};
