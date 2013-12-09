var users = [];
users.push({ first: "clint", last: "eastwood", scancount: 0 , code: 13 });
users.push({ first: "fred", last: "flinstone", scancount: 0 , code: 14 });
users.push({ first: "Larry", last: "Boy", scancount: 0 , code: 15 });
users.push({ first: "bob", last: "tomato", scancount: 0 , code: 16 });

function makeUserList() {
	var listHtml = "";
	for (var i = 0; i < users.length; i += 1){
		makeUserRow(users[i]);
		$("#barcode_"+users[i].code).barcode(makeBarcodeValue(users[i].code), "code39", { barHeight: 20});
	}
}

function makeUserRow(user){
	// read the HTML template from the web page
	var rowTemplate = $("#row_template").html()

	// render the HTML template. This replaces things like {{first}} in the first argument
	// (the template) with the value of "first" on the second argument (the user model.)
	var userRow = Mustache.render(rowTemplate, user);

	// Add our newly rendered HTML to the user list
	$(userRow).appendTo("#userlist").fadeIn();
}

function makeBarcodeValue(code){
	var stringCode = "0000000" + code.toString();
	return stringCode.slice(stringCode.length - 7);
}

function getUserByCode(code){
	for (var i = 0; i < users.length; i += 1){
		if (users[i].code == code) {
			return users[i];
		}
	}
	return {};
}

$(document).ready( function() {
	makeUserList();

	$("#addButton").on( "click", function() {
		var user = { first: $("#firstName").val(), last: $("#lastName").val(), scancount: 0, code: 13 + users.length};
		users.push(user);
		makeUserRow(user);
		$("#barcode_"+user.code).barcode(makeBarcodeValue(user.code), "code39", { barHeight: 20});
		$("#firstName").val("");
		$("#lastName").val("");
		$("#firstName").focus();
	});

	$("#startScanningButton, #addMembersButton").on("click", function() {
		$("#scanUserForm").toggle();
		$("#addUserForm").toggle();
	});

	$("#scanValue").on( "change", function() {
		var scanned = $("#scanValue").val();
		var gotUser = getUserByCode(scanned);
		if (gotUser === {}) {
			//nothing to do
		} else {
			$("#checkbox_"+gotUser.code).prop("checked", true);
		}
		console.log(gotUser);

		$("#scanValue").val("").focus();
	});
});