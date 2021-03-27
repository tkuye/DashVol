"use strict";
const Query = {
    Login: "SELECT username, password, user_id FROM users WHERE username = $1",
    SelecUserAll: "SELECT u.user_fname, u.user_lname, users.username, users.password, users.email, users.user_id FROM user_details u INNER JOIN users ON u.user_id=users.user_id WHERE u.user_id=$1",
    SelectVolPlaces: "SELECT * FROM vol_places WHERE vol_name = $1",
    SelectVolHours: "SELECT * FROM vol_hours WHERE user_id = $1 AND vol_id=$2",
    InsertUser: "INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING user_id",
    InsertUserDetails: "INSERT INTO user_details(user_fname, user_lname, user_id) VALUES ($1, $2, $3)",
    InsertVolunteerPlace: "INSERT INTO vol_places(vol_name, vol_desc, vol_website) VALUES ($1, $2, $3)",
    InsertVolunteerHours: "INSERT INTO vol_hours(user_id, vol_id, hours, vol_date, vol_time) VALUES ($1, $2, $3, $4, $5)",
    UpdateEmail: "UPDATE users SET email=$1 WHERE user_id=$2",
    UpdatePassword: "UPDATE users SET password=$1 WHERE user_id=$2",
    UpdateUsername: "UPDATE users SET username=$1 WHERE user_id=$2",
    UpdateName: "UPDATE user_details SET user_fname=$1, user_lname=$2 WHERE user_id=$3",
    SelectMyVolPlaces: `SELECT v.vol_name, v.vol_desc, v.vol_website,  
    vh.user_id FROM vol_places v INNER JOIN vol_hours vh ON v.vol_id=vh.vol_id WHERE vh.user_id=$1`,
    SelectHoursTotal: "SELECT SUM(hours) AS hours FROM vol_hours WHERE user_id=$1",
    DeleteUser: "DELETE FROM users WHERE user_id=$1"
};
module.exports = Query;
