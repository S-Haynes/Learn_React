import React from 'react'
import Person from './Person/Person'

const persons = (props) => {

	return (props.persons.map(person => {
        return (
          <Person deletePersonHandler={props.clicked.bind(this, person.id)} 
                  key={person.id} name={person.name} 
                  age={person.age} 
                  nameChangeHandler={(event) => props.changed(event, person.id)} />
          		)
      			})
					)
}

export default persons