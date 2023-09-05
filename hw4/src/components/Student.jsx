import { v4 as uuidv4 } from 'uuid';
const Student = ({student}) => {
    return <div className="col-md-3">
        <h2>{student.name.first} {student.name.last}</h2>
        <strong>Major:</strong> {student.major}<br />
        <p>{student.name.first} has taken {student.numCredits} credits</p>
        <strong>Interests:</strong>
        <ul>
            {student.interests.map((interest) => {
                return <li key={uuidv4()}>{interest}</li>
            })}
        </ul>
    </div>
}

export default Student;