var aMsgList = [
    '안녕하세요!',
    '반갑습니다!',
    '또 들러주실 거죠?',
    '광고 좀 눌러주세요!',
    '쪼랩 개발자입니다.'
];

exports.getRandomMsg = function(){
    var idx = Math.floor(Math.random() * aMsgList.length);
    return aMsgList[idx];
};
