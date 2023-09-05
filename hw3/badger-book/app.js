/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */
let students = [];
fetch("https://cs571.org/s23/hw3/api/students", {
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_2b48c7a36a98db55355d"
	}
}).then(response => {
	if (response.status === 200)
		return response.json()
	else
		throw new Error("Something went wrong on api server!");
}).then(data => {
	console.log(data);
	students = data;
	document.getElementById("students").innerHTML = buildStudentsHtml(data);
}).catch(err => console.log(err))

// 注册点击事件
document.getElementById("search-btn").onclick = function () {
	let filtered_students = [...students]
	let searchName = document.getElementById("search-name").value;
	let searchMajor = document.getElementById("search-major").value;
	let searchInterest = document.getElementById("search-interest").value;
	if (searchName !== "" && searchName !== undefined) {
		searchName = searchName.trim();
		let splitName = searchName.split(" ");
		if (splitName.length === 2) {
			filtered_students = filtered_students.filter(stud => stud.name.first.toLowerCase() === splitName[0].toLowerCase() && stud.name.last.toLowerCase() === splitName[1].toLowerCase());
		}
		else
			filtered_students = filtered_students.filter(stud => stud.name.first.toLowerCase().includes(searchName.toLowerCase()) || stud.name.last.toLowerCase().includes(searchName.toLowerCase()));
	}
	if (searchMajor !== "" && searchMajor !== undefined) {
		searchMajor = searchMajor.trim();
		filtered_students = filtered_students.filter(stud => stud.major.toLowerCase().includes(searchMajor.toLowerCase()));
	}
	if (searchInterest !== "" && searchInterest !== undefined) {
		searchInterest = searchInterest.trim();
		filtered_students = filtered_students.filter(stud => stud.interests.some(interest => interest.toLowerCase().includes(searchInterest.toLowerCase())));
	}
	document.getElementById("students").innerHTML = buildStudentsHtml(filtered_students);
}

document.getElementById("reset-search-btn").onclick = function () {
	document.getElementById("search-name").value = "";
	document.getElementById("search-major").value = "";
	document.getElementById("search-interest").value = "";
	document.getElementById("students").innerHTML = buildStudentsHtml(students);
}

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	let html = studs.map(stud => buildStudentHtml(stud)).join('\n');
	return html;

	/**
	 * Given a student object, generates HTML. Use innerHtml to insert this
	 * into the DOM, we will talk about security considerations soon!
	 * 
	 * @param {*} stud 
	 * @returns 
	 */
	function buildStudentHtml(stud) {
		let html = `<div class="col-md-6 col-xs-12">`;
		html += `<h2>${stud.name.first} ${stud.name.last}</h2>
		<p><strong>Major:</strong> ${stud.major}</p>
		<p>They have ${stud.interests.length} interests</p>
		<ul>
		<li>${stud.interests.join('</li><li>')}</li>
		</ul>`;
		html += `</div>`;
		return html;
	}
}

