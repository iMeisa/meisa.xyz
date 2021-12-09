package stardew

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func dbConnect() (*sql.DB, error) {

	db, err := sql.Open("sqlite3", "db/stardew/bundles.db")
	if err != nil {
		return db, err
	}
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS bundle_items (id INTEGER PRIMARY KEY, item_name TEXT, rarity TEXT, amount TEXT, bundle_name TEXT)")
	if err != nil {
		return db, err
	}
	_, err = statement.Exec()
	if err != nil {
		return db, err
	}

	//statement, err = db.Prepare("INSERT INTO bundle_items (item_name, rarity, amount, bundle_name) VALUES (?, ?, ?, ?)")
	//if err != nil {
	//	fmt.Println("Could not prepare db")
	//}
	//_, err = statement.Exec("Parsnip", "Gold", "5", "idk")
	//if err != nil {
	//	fmt.Println("Could not execute statement")
	//}
	//
	//rows, err := db.Query("SELECT * FROM bundle_items")
	//if err != nil {
	//	fmt.Println("Could not query db")
	//}
	//
	//var id int
	//var itemName string
	//var rarity string
	//var amount string
	//var bundleName string
	//for rows.Next() {
	//	err = rows.Scan(&id, &itemName, &rarity, &amount, &bundleName)
	//	if err != nil {
	//		fmt.Println("Could not scan rows")
	//	}
	//	fmt.Println(fmt.Sprintf("%d: %s (%s) x%s", id, itemName, rarity, amount))
	//}

	return db, nil
}

func QueryBundles() string {
	db, err := dbConnect()
	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query("SELECT id, item_name, rarity, amount, bundle_name FROM bundle_items")
	items := dbToJSON(rows)
	return items
}

func QueryAllBundleItems() {

	//rows, err :=
}
