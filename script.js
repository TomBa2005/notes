// Page (DOM) has finished loading:
$(function () {

    /* 1. API-KEY: START ----------------------------------------
		- Purpose: Send the API key to authenticate with the Server
        - Remark: Do not touch this
    ------------------------------------------------------------- */

    // 1.1. Send the API key with every jQuery AJAX-call:
    $.ajaxSetup({ 'headers': { 'X-Auth-Token': 'a534e63a0d68ad8ec00d' } });

    /* API-KEY: END --------------------------------------------- */


    /*AB HIER START FÜR UNS 2. FETCH NOTES: START ------------------------------------
        - Purpose: Fetch and display all posts from the server
		- Task: Assignment #13 - Minimal requirements: Task #3
    ------------------------------------------------------------- */

	reloadPosts();

    /* FETCH NOTES: END ----------------------------------------- */


    /* 4. CREATE NOTES: START ------------------------------------
        - Purpose: Create a note
		- Task: Assignment #13 - Minimal requirements: Task #5
    -------------------------------------------------------------- */

    // 4.1. The "create note"-form was submitted
    // Hint: Execute the "create a note" logic (below) whenever the "create note"-form was submitted
	// Hint: Don't forget to prevent the form from submitting (forcing a refresh) - event.preventDefault();
	// Hint: Check if the form was completed (no fields are empty)

		// 4.2. Send a note (completed form) to the server
		// Hint: You need to replace the contents of the variable "formData" with the data of the form
		// var formData = $('.createnote').serialize(); // Example on how to get the form data using jQuery (depending on your code)
		// $.post('https://nafra.at/adad_st2022/notes/', formData, function (response) {

		// 	// 4.3. Return and display the new note
		// });
	var addPostForm = $('#createpost');
	addPostForm.submit(function (event) {
		event.preventDefault();
		var formData = $(this).serialize();
		// console.log(formData)
		$.post('https://nafra.at/adad_st2022/notes/', formData, function (response) {
			reloadPosts();
		});
	});
    /* CREATE NOTES: END ----------------------------------------- */


    /* 6. YOUR OWN IDEAS: START ------------------------------------
        - Purpose: Your own purpose
		- Task: Assignment #13 - Challenge requirements: Task #4
    ---------------------------------------------------------------- */

    // Hint: Be creative :-)

    /* YOUR OWN IDEAS: END ----------------------------------------- */
});

function reloadPosts() {
		$("#notes").empty();
		var sort = 'new';
		sort = document.getElementById("sort").value;

		// console.log(sort)

	    // 1.1. Send the API key with every jQuery AJAX-call:
		$.ajaxSetup({ 'headers': { 'X-Auth-Token': 'a534e63a0d68ad8ec00d' } });

		/* API-KEY: END --------------------------------------------- */


		/*AB HIER START FÜR UNS 2. FETCH NOTES: START ------------------------------------
			- Purpose: Fetch and display all posts from the server
			- Task: Assignment #13 - Minimal requirements: Task #3
		------------------------------------------------------------- */

		// 2.1. Fetch the data from the server
		// Hint: Within this task, you can easyly handle the task #1 of the challenge requirements by dynamically updating the filter parameter
		// Hint: See the referencing example from our lecture: https://replit.com/@Stefan86/referencing/
		$.getJSON('https://nafra.at/adad_st2022/notes/?sort=' + sort, function (data) {

			// 2.2. Display the received data
			// Hint: Iterate over the "data" object (using a loop - try the forEach) and return the posts back to the page
			// Hint: See the templating example from our lecture: https://replit.com/@Stefan86/templating/

			data.forEach(post => {
				var comments = []
				post.hasOwnProperty('comments') ? comments = post.comments : comments = [];
				// console.log(comments)
				$("#notes").append(`
								<li id="${post.id}" class="post">
									<h3>${post.user}</h3>
									<p>
										${post.text}
									</p>
									<p>
										${post.timestamp}
									</p>
									<h3 id="votes_${post.id}">Votes: ${post.votes}</h3>
									<button onclick="vote(${post.id})" class="votebutton">Vote</button>
									<form id="addComment_${post.id}" class="createcomment">
										<input type="text" name="user" placeholder="Name">
										<input type="text" name="text" placeholder="Comment">
										<button type="submit">Comment</button>
									</form>
									<ul class="comments" id="comments_${post.id}">
									</ul>

								</li>
							`);

				// 5.1. The "create comment"-form was submitted
				// Hint: Execute the "create a comment" logic (below) whenever the "create comment"-form was submitted
				// Hint: Don't forget to prevent the form from submitting (forcing a refresh) - event.preventDefault();
				// Hint: Check if the form was completed (no fields are empty)

					// 5.2. Send a comment (completed form) to the server
					// Hint: You need to replace the variable "noteID" with the ID of the note that should be commented
					// Hint: See the referencing example from our lecture: https://replit.com/@Stefan86/referencing/
					// var noteID = document.querySelector('.votebutton').target.dataset.noteId; // Example on how to get an ID (depending on your code)
					// Hint: You need to replace the contents of the variable "formData" with the data of the form


				var addCommentForm = $('#addComment_' + post.id);
				// console.log(addCommentForm)
				addCommentForm.submit(function (event) {
					event.preventDefault();
					var formData = $(this).serialize();
					// console.log(post.id)
					$.post('https://nafra.at/adad_st2022/notes/' + post.id, formData, function (response) {
						console.log(response)
						reloadPosts();
					});
				});

				/* CREATE COMMENTS: END ----------------------------------------- */

				comments.forEach(comment => {
					$("#comments_" + post.id).append(`
						<li>
							<h3>${comment.user}</h3>
							<p>${comment.text}</p>
							<p>${comment.timestamp}</p>
					`)
				})
			});

				// 2.3. Display the date in a different format (Challenge requirements: Task #3)
				// Hint: You're allowed to use a plugin for this task

				// Example: data[0]['text'] contains the text of the first entry
		});
}


/* 3. VOTE NOTES: START ------------------------------------
	- Purpose: Vote on a note
	- Task: Assignment #13 - Minimal requirements: Task #4
------------------------------------------------------------ */

// 3.1. Vote button was pressed:
// Hint: Execute the (folowing) "vote on a note" functionality whenever a "vote"-button is pressed

		// 3.2. Increase the "vote"-counter on the server
		// Hint: You need to replace the contents of the variable "noteID" with the ID of the note on which the button was pressed
		// Hint: See the referencing example from our lecture: https://replit.com/@Stefan86/referencing/
		// var noteID = document.querySelector('.votebutton').target.dataset.noteId; // Example on how to get an ID (depending on your code)


/* VOTE NOTES: END ----------------------------------------- */

function vote(noteID) {
	$.get('https://nafra.at/adad_st2022/notes/' + noteID, function (data) {
		$('#votes_' + noteID).text('Votes: ' + data);
	});
}

function showAddPost() {
	$("#createpost").toggle();
}