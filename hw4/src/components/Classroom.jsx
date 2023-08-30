import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const [originalStudents, setOriginalStudents] = useState([])
    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchMajor, setSearchMajor] = useState("")
    const [searchInterest, setSearchInterest] = useState("")
    useEffect(() => {
        fetch("https://cs571.org/s23/hw4/api/students", {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            }
        }).then(res => res.json()).then(data => {
            setStudents(data)
            setOriginalStudents(data)
            // console.log(data);
        })
    }, [])

    useEffect(search, [searchName, searchMajor, searchInterest])

    function search() {
        let filtered_students = [...originalStudents]

        if (searchName !== "" && searchName !== undefined) {
            let processedName = searchName.trim();
            let splitName = processedName.split(" ");
            if (splitName.length === 2) {
                filtered_students = filtered_students.filter(stud => stud.name.first.toLowerCase() === splitName[0].toLowerCase() && stud.name.last.toLowerCase() === splitName[1].toLowerCase());
            }
            else
                filtered_students = filtered_students.filter(stud => stud.name.first.toLowerCase().includes(processedName.toLowerCase()) || stud.name.last.toLowerCase().includes(processedName.toLowerCase()));
        }
        if (searchMajor !== "" && searchMajor !== undefined) {
        	let processed_searchMajor = searchMajor.trim();
        	filtered_students = filtered_students.filter(stud => stud.major.toLowerCase().includes(processed_searchMajor.toLowerCase()));
        }
        if (searchInterest !== "" && searchInterest !== undefined) {
        	let processed_searchInterest = searchInterest.trim();
        	filtered_students = filtered_students.filter(stud => stud.interests.some(interest => interest.toLowerCase().includes(processed_searchInterest.toLowerCase())));
        }
        setStudents(filtered_students);
    }

    function reset_search() {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setStudents(originalStudents);
    }

    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={e => { setSearchName(e.target.value) }} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={e => { setSearchMajor(e.target.value) }} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={e => { setSearchInterest(e.target.value) }} />
            <br />
            <Button variant="neutral" onClick={reset_search}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                { /* TODO Students go here! */
                    students.map((student) => {
                        return <Student key={student.id} student={student}></Student>
                    })
                }
            </Row>
        </Container>
    </div>

}

export default Classroom;