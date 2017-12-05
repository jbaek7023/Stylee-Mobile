
// 1
const bigType = [{
  id: 1,
  value: 'Top',
}, {
  id: 2,
  value: 'Outwear',
}, {
  id: 3,
  value: 'Bottom',
}, {
  id: 4,
  value: 'Shoes',
}, {
  id: 5,
  value: 'ETC',
}];

//select 2
const seasons = [{
  id: 6,
  value: 'All Seasons',
}, {
  id: 7,
  value: 'Spring',
}, {
  id: 8,
  value: 'Summer',
}, {
  id: 9,
  value: 'Fall',
}, {
  id: 10,
  value: 'Winter',
}];

const topType = [{
  id: 99,
  value: 'T-Shirt',
}, {
  id: 100,
  value: 'Shirt/Blouse',
}, {
  id: 101,
  value: 'Sweatshirt / Long Sleeve',
}, {
  id: 102,
  value: 'Knitwear/Sweater',
}, {
  id: 103,
  value: 'Hoodies',
}, {
  id: 104,
  value: 'Sleeveless Shirt',
}, {
  id: 105,
  value: 'One Piece',
}, {
  id: 106,
  value: 'Other Top',
}];

const outwearType = [{
  id: 16,
  value: 'Coat/Blazer',
}, {
  id: 17,
  value: 'Jacket/Jumper',
}, {
  id: 18,
  value: 'Cardigan',
}, {
  id: 19,
  value: 'Padded Jacket / Padded Coat',
}, {
  id: 20,
  value: 'Field Jacket',
}, {
  id: 96,
  value: 'Zip Up Hoodie',
}, {
  id: 97,
  value: 'Vest',
}, {
  id: 98,
  value: 'Other Outwear',
}];

const etcType = [{
  id: 71,
  value: 'Bag'
}, {
  id: 72,
  value: 'Hat'
}, {
  id: 73,
  value: 'Watch'
}, {
  id: 74,
  value: 'Belt'
}, {
  id: 75,
  value: 'Swimwear'
}, {
  id: 76,
  value: 'Socks'
}, {
  id: 77,
  value: 'Cell Phone Case'
}, {
  id: 78,
  value: 'Ring'
}, {
  id: 79,
  value: 'Earring'
}, {
  id: 80,
  value: 'Necklace'
}, {
  id: 81,
  value: 'Others'
}]

const shoeType = [{
  id: 82,
  value: 'Sneakers'
}, {
  id: 83,
  value: 'Loafers'
}, {
  id: 84,
  value: 'High Heel'
}, {
  id: 85,
  value: 'Shoes'
}, {
  id: 86,
  value: 'Boots'
}, {
  id: 87,
  value: 'Flip-Flop/Sandals'
}, {
  id: 88,
  value: 'Sandals'
}, {
  id: 89,
  value: 'Other Shoes'
}]

const bottomType = [{
  id: 90,
  value: 'Pants/Slacks'
},{
  id: 91,
  value: 'Jeans'
},{
  id: 92,
  value: 'Training Pants'
},{
  id: 93,
  value: 'Shorts'
},{
  id: 94,
  value: 'Skirt'
},{
  id: 95,
  value: 'Other Bottoms'
}]

//3
const genders = [{
  id: 21,
  value: 'Unisex',
}, {
  id: 22,
  value: 'Male',
}, {
  id: 23,
  value: 'Female',
}];

// 4
const topSize = [{
  id: 47,
  value: 'Free'
}, {
  id: 24,
  value: 'XXS',
}, {
  id: 25,
  value: 'XS',
}, {
  id: 26,
  value: 'S',
}, {
  id: 27,
  value: 'M',
}, {
  id: 28,
  value: 'L',
}, {
  id: 68,
  value: 'XL',
}, {
  id: 69,
  value: 'XXL',
}, {
  id: 70,
  value: 'XXXL',
}];

const bottomSize = [{
  id: 48,
  value: 'Free'
}, {
  id: 34,
  value: '26',
}, {
  id: 35,
  value: '27',
}, {
  id: 36,
  value: '28',
}, {
  id: 37,
  value: '29',
}, {
  id: 38,
  value: '30',
}, {
  id: 60,
  value: '31',
}, {
  id: 61,
  value: '32',
}, {
  id: 62,
  value: '33',
}, {
  id: 63,
  value: '34',
}, {
  id: 64,
  value: '35',
}, {
  id: 65,
  value: '36',
}, {
  id: 66,
  value: '37',
}, {
  id: 67,
  value: '38',
}, {
  id: 72,
  value: '39',
}, {
  id: 73,
  value: '40',
}];

const shoeSize = [{
  id: 39,
  value: '6',
}, {
  id: 40,
  value: '6.5',
}, {
  id: 41,
  value: '7',
}, {
  id: 42,
  value: '7.5',
}, {
  id: 43,
  value: '8',
}, {
  id: 49,
  value: '9'
}, {
  id: 50,
  value: '9.5'
}, {
  id: 51,
  value: '10'
}, {
  id: 52,
  value: '10.5'
}, {
  id: 53,
  value: '11'
}, {
  id: 54,
  value: '11.5'
}, {
  id: 55,
  value: '12'
}, {
  id: 56,
  value: '13'
}, {
  id: 57,
  value: '14'
}, {
  id: 58,
  value: '15'
}, {
  id: 59,
  value: '16'
}];

// 5
const clothColors = [{
  id: 29,
  value: '#FF0000',
  name: 'red'
}, {
  id: 30,
  value: '#FFA500',
  name: 'orange'
}, {
  id: 31,
  value: '#ffff00',
  name: 'yellow'
}, {
  id: 32,
  value: '#32CD32',
  name: 'green'
}, {
  id: 33,
  value: '#0000ff',
  name: 'blue'
}, {
  id: 107,
  value: '#7D26CD',
  name: 'purple'
}, {
  id: 108,
  value: '#FF69B4',
  name: 'pink'
}, {
  id: 110,
  value: '#7EC0EE',
  name: 'sky blue'
}, {
  id: 111,
  value: '#C0C0C0',
  name: 'silver'
}, {
  id: 112,
  value: '#FFD700',
  name: 'gold'
}, {
  id: 113,
  value: '#8B4513',
  name: 'brown'
}, {
  id: 114,
  value: '#301226',
  name: 'White'
}, {
  id: 115,
  value: '#301226',
  name: 'Dark Red'
}, {
  id: 116,
  value: '#000000',
  name: 'Black'
}]

export { seasons, genders, outwearType, topType, bigType, topSize, clothColors, bottomSize, shoeSize, bottomType, shoeType, etcType };
