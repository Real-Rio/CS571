import { Text, View, Button, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import { useEffect, useRef, useState } from "react";

export default function BadgerBakery() {
    const [goods, setGoods] = useState([]);
    const [curGood, setCurGood] = useState(0);
    const [data, setData] = useState({});
    const [curOrderNum, setCurOrderNum] = useState(0);
    const [orders, setOrders] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const curName = useRef(0)

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            }
        }).then(handleRespnse).then(data => {
            // console.log(data)
            setGoods(Object.keys(data).map(key => {
                return { ...data[key], name: key }
            }));
            // setCurGood(0);
        })
            .catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
            });
    }, [])

    useEffect(() => {
        if (goods[curGood])
            curName.current = goods[curGood].name;
        else
            return;
        console.log("curname is " + curName.current);
        if (orders[curName.current])
            setCurOrderNum(orders[curName.current]);
        else
            setCurOrderNum(0);

    }, [curGood])

    useEffect(() => {
        calTotal();
    }, [orders])


    const AddtoCart = () => {
        curName.current = goods[curGood].name;
        if (orders[curName.current] && curOrderNum === 0)
            delete orders[curName.current];
        else
            setOrders({ ...orders, [curName.current]: curOrderNum });
        console.log(orders);
        // console.log({goods[curGood].name:curOrderNum});

    }


    const calTotal = () => {
        if (orders === {})
            return;
        let tempTotal = 0;
        // console.log(orders);
        for (let key in orders) {
            tempTotal += orders[key] * goods.find(good => good.name === key).price;
        }
        setTotalPrice(tempTotal);
        // console.log(tempTotal);
    }

    const submitOrder = () => {
        if (orders === {} || Object.keys(orders).every(key => orders[key] === 0)) {
            Alert.alert("Please add something to cart first!");
            return;
        }
        // console.log(orders);
        fetch("https://www.cs571.org/s23/hw8/api/bakery/order", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orders)
        }).then(handleRespnse).then(data => {
            Alert.alert("Order submitted successfully!");
            setOrders({});
            setTotalPrice(0);
        }).catch(error => {
            Alert.alert(error);
        });

    }

    function handleRespnse(response) {
        return response.json().then(json => {
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(json);
            }
        })
    };

    return <View>
        {/* <Text>Welcome to Badger Bakery!</Text> */}
        <BadgerBakedGood {...goods[curGood]}></BadgerBakedGood>
        {/* {goods.map(good => <BadgerBakedGood key={good.name}  {...good} />)} */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button title="Previous" onPress={() => {
                setCurGood((curGood + goods.length - 1) % goods.length);
                setCurOrderNum(0);
            }
            }></Button>
            <Button title="Next" onPress={() => {
                setCurGood((curGood + 1) % goods.length);
                setCurOrderNum(0);
            }
            }></Button>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button title="-1" disabled={curOrderNum === 0} onPress={() => {
                setCurOrderNum(curOrderNum - 1);
            }
            }></Button>
            <Text style={{ paddingTop: 10 }}>{curOrderNum} </Text>
            {goods[curGood] && <Button title="+1" disabled={curOrderNum === goods[curGood].upperBound} onPress={() => {
                setCurOrderNum(curOrderNum + 1);
            }
            }></Button>}
        </View>
        <Button title="Add to cart" onPress={AddtoCart}></Button>
        <Text style={{ textAlign: "center" }}>Total order is ${totalPrice}</Text>
        <Button title="Submit Order" onPress={submitOrder}></Button>

    </View>
}
