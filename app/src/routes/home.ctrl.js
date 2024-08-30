"use strict"

const Crypto = require("crypto");
const axios = require("axios");

const output = {
    root: (req, res) => {
        res.render("index");
    },
}

const process = {
    submit: async (req, res) => {
        try {
            // 요청 바디에서 데이터 받기
            const {
                mid,
                ediDate,
                goodsAmt,
                payMethod,
                trxCd,
                goodsNm,
                currencyType,
                ordNo,
                ordNm,
                ordTel,
                returnUrl,
            } = req.body;

            // merchantKey는 서버에서 관리하며 공개되지 않도록 합니다.
            const merchantKey = "2d6EGChR1pg/1QGE1lcRI4awsWEgshjEyI8UgYsLIPJSuNeyPTkdrT8XWARRezvDTUCIWQWhjxzBbu7AsuLZqg==";

            // encData 생성 (SHA-256 해시 생성)
            const rawData = mid + ediDate + goodsAmt + merchantKey;
            const encData = Crypto.createHash("sha256").update(rawData).digest("hex");

            // 데이터 구성
            const postData = {
                payMethod,
                trxCd,
                mid,
                goodsNm,
                currencyType,
                ordNo,
                goodsAmt,
                ordNm,
                ordTel,
                ediDate,
                encData,
                returnUrl,
            };

            console.log("construct data fin");

            // 외부 API로 POST 요청
            const response = await axios.post('https://testapi.kispg.co.kr/v2/auth', postData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // 응답 처리
            res.json({
                message: 'POST request to external API was successful',
                externalApiResponse: response.data
            });

        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: 'An error occurred while processing the request', error: error.message });
        }
    }
};

module.exports = {
    output,
    process
};