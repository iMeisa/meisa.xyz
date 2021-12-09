package stardew

import (
	"database/sql"
)

func dbToJSON(rows *sql.Rows) []BundleItem {
	bundleItems := make([]BundleItem, 0)

	for rows.Next() {
		newItem := BundleItem{}

		rows.Scan(&newItem.ID, &newItem.ItemName, &newItem.Rarity, &newItem.Amount, &newItem.BundleName)

		bundleItems = append(bundleItems, newItem)
	}

	//itemsJSONList := make([]string, 0)
	//for _, item := range bundleItems {
	//	if item.ID == 0 {
	//		continue
	//	}
	//
	//	itemJSON, err := json.Marshal(item)
	//	if err != nil {
	//		fmt.Println("Idk something with jsons")
	//	}
	//
	//	itemsJSONList = append(itemsJSONList, string(itemJSON))
	//}
	//itemsJSON, _ := json.Marshal(itemsJSONList)
	return bundleItems
}
