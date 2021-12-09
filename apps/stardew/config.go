package stardew

type BundleItem struct {
	ID         int    `json:"id"`
	ItemName   string `json:"item_name"`
	Rarity     string `json:"rarity"`
	Amount     string `json:"amount"`
	BundleName string `json:"bundle_name"`
}
