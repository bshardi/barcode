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
	var userRow = $("<div/>").addClass("row");
	var checkbox = $("<div/>").addClass("checkbox");
	$("<input/>").attr("id", "checkbox_"+user.code).attr("type", "checkbox").appendTo(checkbox);
	$(checkbox).appendTo(userRow);
	$("<span/>").addClass("col-md-2").html(user.first + " " + user.last).appendTo(userRow);
	$("<div/>").attr("id", "barcode_"+user.code).appendTo(userRow);
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