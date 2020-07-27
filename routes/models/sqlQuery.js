//SQL Query

const projectsQuery = `SELECT prj.project_title, prj.date_added, usr.user_id, usr.username, cat.categoryName 
                        FROM auction.ilance_projects prj 
                        INNER JOIN ilance_users usr 
                        USING (user_id) 
                        LEFT JOIN ilance_categories cat 
                        ON cat.cid = prj.cid
                        ORDER BY prj.date_added ASC `;

module.exports = projectsQuery;
