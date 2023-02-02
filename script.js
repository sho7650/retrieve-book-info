javascript: {
  let p = document.getElementById("productTitle");//書籍のタイトルの処理
  if (!p) p = document.getElementById("ebooksProductTitle");
  const title = p.innerText.trim();
  let asin = document.getElementById('ASIN'); //ASIN番号の処理
  if (!asin) {
    asin = document.getElementsByName('ASIN.0')[0];
  }
  const a = asin.value;

  //登録情報欄を取得
  let detail = document.getElementById('detailBullets_feature_div');
  if (!detail) {
      const subdoc = document.getElementById("product-description-iframe").contentWindow.document;
      detail = subdoc.getElementById("detailBullets_feature_div");
  }
  // var detailtext = detail.innerText;
  let pubdata = detail.innerText.split(/\n/);
  pubdata[2] = pubdata[2].slice(10);//出版社
  pubdata[1] = pubdata[1].slice(10);//出版社
  //var publish = pubdata.filter(pubdata => detailtext.match(/\出版社/));
  //var publisher = publish[0];//出版社
  const url = 'https://www.amazon.co.jp/exec/obidos/ASIN/'+a+'/cluboshiire-22/';
  const link = '[' + title + '](' + url + ')';

  // 選択範囲を取得する
  let select = window.getSelection().toString();  // 選択範囲を文字列として取得
  if (select) { // 選択範囲があるとき
    select = select.replace(/(\W+)( )(\W+)/g,'$1$3'); // 字間に時々紛れている半角スペースを除去
    select = "\n> " + select.replace(/\n/g,'\n> '); // 行ごとに引用の「>」を付与
  } else { // 選択範囲が空のとき
    select = "";
  };

  let image = document.getElementById("imgBlkFront"); //書影の処理
  if (!image) image = document.getElementById("ebooksImgBlkFront");
  const imageurl = image.getAttribute("src");
  var pub = [];//著者情報の処理
  var simplePub = [];
  var c = document.getElementsByClassName('author');
  for (g = 0; g < c.length; g++) {
      var at = c[g].innerText.replace(/\r?\n/g, '').replace(/,/, '');
      var pu = at.match(/\(.+\)/);
      var ct = at.replace(/\(.+\)/, '').replace(/ /g, '');
      pub.push('[[' + ct + ']]');
      simplePub.push(ct);
  }
  var author = pub.join(' ');
  var simpleAuthors = simplePub.join(' ');
  // 自分が必要なパラメータに変換
  var h1title = '# 『' + title + '』\n\n';
  var mdimage = '\n![|100](' + imageurl + ')\n';
  // 表示させたい項目
  var lines = '---\ntitle: ' + title + '\nauthor: ' + simpleAuthors+ '\n' + 'asin: ' + pubdata[1] + '\n' + 'publish_date: ' +  pubdata[2] + '\n---\n' + link + '\n' + pub.join(' ') + mdimage + '\n' + select + '\n';
  document.getElementById('bookDescription_feature_div').innerHTML = '<textarea style="height:500px">' + lines + '</textarea>';
}