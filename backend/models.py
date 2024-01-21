from exts import db

#Event Model
"""
class Event:
    id:int primary key
    title:str 
    description:str (text)
    date:str
    location:str 
"""


class Event(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    date = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=True)

    def __repr__(self):
        return f"<Event {self.title} >"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description, date, location):
        self.title = title
        self.description = description
        self.date = date
        self.location = location

        db.session.commit()


#User Model
"""
class User:
    id:integer
    username:string
    email:string
    password:string
"""

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()