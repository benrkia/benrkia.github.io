"use strict"

//Set focus
window.addEventListener('click', function(e) {
	document.querySelector('#input input').focus();
});

//Key press Listener
this.cli.addEventListener('keydown', function(e) {
	var key = e.which || e.keyCode;
	if (key === 9) { //click tab
		e.preventDefault();
		terminal.suggest();
	}
	else if (key === 13) { //click enter
		terminal.newCmd();
	}
	else if (key === 38) { //click up
		e.preventDefault();
		terminal.keyUp();
	}
	else if (key === 40) { //click down
		e.preventDefault();
		terminal.keyDown();
	}
}, false);

//Execute cmd, Show output
let CLI = class {

	static output(values, terminal, type=null, args=null) { //Output
		
		let newInput = document.createElement('div');
		newInput.className = 'input';

		let newPrompt = document.createElement('div');
		newPrompt.className = 'prompt';
		newPrompt.innerHTML = terminal.config.bash;
		newInput.appendChild(newPrompt);

		let newDiv = document.createElement('div');
		newDiv.innerHTML = terminal.cli.value;
		newInput.appendChild(newDiv);
		newInput.innerHTML += (args ===null ) ? '' : args;

		if(values !== null) {
			let newP = document.createElement('p');
			if(type === 'help') {
				values.forEach((value) => {
					newP.innerHTML += value.name+": "+value.description+"<br>";
				});
			}else {
				newP.innerHTML = values;
			}
			newInput.appendChild(newP);
		}

		terminal.output.appendChild(newInput);

		window.scrollTo(0,document.body.scrollHeight);

	}

	static execute(terminal) { //Execute new cmd

		switch(terminal.cli.value) {
			case 'clear':
				terminal.output.innerHTML = "";
				break;
			case 'help':
				CLI.output(terminal.config.cmds, terminal, "help", "<h2>HELP</h2>");
				break;
			case 'host':
				CLI.output(navigator.appVersion, terminal, null, "<h2>HOST</h2>");
				break;
			case 'interests':
				CLI.output(terminal.config.content.interests, terminal, null, "<h2>Interests</h2>");
				break;
			case 'contact':
				CLI.output(terminal.config.content.contact, terminal, null, "<h2>Contact ^^</h2>");
				break;
			case 'whoami':
				CLI.output(terminal.config.content.whoami, terminal, null, "<h2>Ilyasse Benrkia</h2>");
				break;
			case 'education':
				CLI.output(terminal.config.content.education, terminal, null, "<h2>Education</h2>");
				break;
			case 'programming':
				CLI.output(terminal.config.content.programming, terminal, null, "<h2>Programming</h2>");
				break;
			default:
				CLI.output(terminal.cli.value, terminal);
				break;
		}
		terminal.cli.value = '';
	}

	static addToHistory(cmd) {
		terminal.config.history.push(cmd);
		terminal.config.hisCurrentPos = terminal.config.history.length;
	}
}

//Terminal main class
let Terminal = class {

	constructor() {
		this.prompt = document.querySelector("#prompt");
		this.cli = document.querySelector("#cli");
		this.output = document.querySelector("#output");
		this.config = {
			bash : "root@benrkia:~#",
			notFoundMsg : "command not found",
			history : [],
			hisCurrentPos : 0,
			cmds : [
				{name:"whoami", description:"Display information about me."},
				{name:"education", description:"Display information about my education."},
				{name:"programming", description:"Display my programming experiences."},
				{name:"interests", description:"Some of my interests."},
				{name:"contact", description:"Where you can contact me ^^."},
				{name:"host", description:"Display browser information."},
				{name:"help", description:"Give some help ^^."},
				{name:"clear", description:"Clear the terminal screen."}
			],
			content : {
				contact:
				`
					<ul type="circle">
						<li>
							Email: <a href='mailto:benrkyailyass@gmail.com'>benrkyailyass@gmail.com</a>
						</li>
						<li>
							Facebook: <a href='https://www.facebook.com/benilya' target='_blank'>benilya</a>
						</li>
						<li>
							Twitter: <a href='https://twitter.com/benrkyailyass' target='_blank'>@benrkyailyass</a>
						</li>
						<li>
							Instagram: <a href='https://www.instagram.com/benrkia_i/' target='_blank'>benrkia_i</a>
						</li>
					</ul>
				`,
				interests:'Algorithms, Data Structures, Problem Solving, AI, Open Source Technologies, Astronomy, Communication, Social Entrepreneurship, Traveling, Football...',
				whoami:
				`
					Software Engineering Student, Philanthropist<br /><br />
					I am 20 years old, from rabat. I am a Software Engineering and Distributed IT Systems student at Hassan 2 University in Casablanca, Morocco, and Associative Actor.<br />
					My interest in IT started in 2009 when i got my first computer. Next year, in secondary school i took my first computer class when i learned how to assemble a computer, then i started computer repair for myself and my neighbors.<br />
					From that point, i've started learning new things such as networking, security, web technologies, programming...<br />
					Last year, i discovered something called competitive programming through the ACM MCPC. I and my teammate were very close to being qualified to the ACPC, but our experience wasn't enough.<br />
					Next year, i'm going to make it happen.<br />
					Check my <a href="https://goo.gl/Pb3D9E" target="_blank">Resume</a>

					<h3>Open Source Projects</h3>
					<strong>Dijkstra-Algorithm, Graph Designer</strong> a web tool that gives you the possibility to create an oriented graph and apply Dijkstra algorithm to find the shortest path between a chosen vertex and all the other vertices.<br />
					<strong>Notes Management</strong> Web<br />
					<strong>Notes Management</strong> Mobile (ios, android, windows phone)<br />
					<strong>Intervention Management</strong> a tool that gives you the possibility to manage your interventions in a dynamique way using your computer and android phone.<br />
					You can find my projects on <a href="https://github.com/benrkia" target="_blank">Github</a><br />

					<h3>Freelance</h3>
					I started working freelance in 2014, by making simple HTML/CSS pages. Then i moved to creating simple web applications back and front end. A year later i was capable of creating advanced web application through fiver.com and khamsat.com.<br />
					In 2016, i sold my first android application. It was a recipes app.<br />
					With freelance, i acquired a very important experience and i learned how to deal directly with clients, to communicate, to negotiate and how to respect time and deals.

					<h3>Competitive Programmer</h3>
					Contestant in the Moroccan Collegiate Programming Contest 2017 with my team “IMWTS“

					<h3>Social Work</h3>
					I was member in serval social work associations in my city RABAT. I recently joined <a href="https://www.facebook.com/associationsocialfamily/" target="_blank">Social Family</a> which is a Nonprofit Organization in the city where i study, Casablanca.<br />
					The social work gives me the capability of serving multiple populations, to be part of the others healing and transformation...<br />
					This is one of the best sources of knowledge i've been learning from. Also it's a source of positivity, inspiration and but also a sense of belonging.<br />

					<h3>Social Entrepreneurship</h3>
					I discovered social entrepreneurship in the college. And as a social worker, i find that social work and social entrepreneurship are two sides of the same coin. Then i decided to be an intermediate between social startups and social associations.<br />
					Now i am working on creating my own social startup.<br />

					<h3>Interests</h3>
					Algorithms, Data Structures, Problem Solving, AI, Open Source Technologies, Astronomy, Communication, Social Entrepreneurship, Traveling, Football...
				`,
				education:
				`
					<ul type="none">
						<li>
							<strong>Software Engineer Diploma</strong> at Higher Normal School of Technical Education in Mohammedia, Morocco (In progress)
							<ul type="square">
								<li>Department of Mathematics and Computer Science, Option Software Engineering and Distributed Information Systems</li>
							</ul>	
						</li>
						<li>
							<strong>Technical University degree</strong> in 2017 from the Highest School of Technology in Sale, Morocco
							<ul type="square">
								<li>IT department, Option Computer Network Administration with <strong>Honors</strong></li>
							</ul>
						</li>
						<li>
							<strong>Baccalaureate in Physics</strong> in 2015 from Abdellah Guennoun High School in Rabat, Morocco
						</li>	
					</ul>
				`,
				programming:
				`
					<strong>Dijkstra-Algorithm, Graph Designer</strong> a web tool that gives you the possibility to create an oriented graph and apply Dijkstra algorithm to find the shortest path between a chosen vertex and all the other vertices.<br />
					<strong>Notes Management</strong> Web<br />
					<strong>Notes Management</strong> Mobile (ios, android, windows phone)<br />
					<strong>Intervention Management</strong> a tool that gives you the possibility to manage your interventions in a dynamique way using your computer and android phone.<br />
					you can find my projects on <a href="https://github.com/benrkia" target="_blank">Github</a><br />

					<h3>Freelance</h3>
					I started working freelance in 2014, by making simple HTML/CSS pages. Then i moved to creating simple web applications back and front end. A year later i was capable of creating advanced web application through fiver.com and khamsat.com.<br />
					In 2016, i sold my first android application. It was a recipes app.<br />
					With freelance, i acquired a very important experience and i learned how to deal directly with clients, to communicate, to negotiate and how to respect time and deals.

					<h3>Competitive Programmer</h3>
					Contestant in the Moroccan Collegiate Programming Contest 2017 with my team “IMWTS“
				`
				
			}
		};
	}

	init() { //initialize 
		this.prompt.textContent = this.config.bash;
	}

	newCmd() { //Check if cmd existe
		
		// check if cmd is empty
		if (this.cli.value.length === 0) {
			CLI.output(null, this);
			return;
		}

		// Add cmd to history
		CLI.addToHistory(this.cli.value);

		let cmd = this.config.cmds
		.map((cmd) => cmd.name)
		.filter((name) => name === this.cli.value);
		if(cmd.length === 0) {
			var msg = this.cli.value+": "+this.config.notFoundMsg;
			CLI.output(msg, this);
			this.cli.value = "";
		}else if(cmd.length === 1) {
			CLI.execute(this);
		}
	}

	suggest() { //Check the suggestions

		// check if cmd is empty
		if (this.cli.value.length === 0) {
			return;
		}

		let suggestions = this.config.cmds
		.filter((cmd) => {
			return (cmd.name.indexOf(this.cli.value.toLowerCase()) > -1);
		});
		if(suggestions.length === 1) {
			this.cli.value = suggestions[0].name;
		}else if(suggestions.length > 1) {
			CLI.output(suggestions, this, "help");
		}

	}

	keyUp() { //Browse history, Up
		if(this.config.hisCurrentPos > 0) {
			this.cli.value = this.config.history[(this.config.hisCurrentPos > 1 ? --this.config.hisCurrentPos : this.config.hisCurrentPos-1)];
		}
	}

	keyDown() { //Browse history, Down
		if(this.config.hisCurrentPos < this.config.history.length) {
			this.cli.value = this.config.history[this.config.hisCurrentPos++];
		}
		else if(this.config.hisCurrentPos === this.config.history.length) {
			this.cli.value = '';
		}
	}

}

let terminal = new Terminal();
terminal.init();