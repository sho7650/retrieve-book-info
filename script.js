javascript: {
  // 書籍名の取得
  const productTitle = document.getElementById("productTitle");
  const ebooksProductTitle = document.getElementById("ebooksProductTitle");
  const title = productTitle ? productTitle.innerText.trim() : ebooksProductTitle.innerText.trim();

  // ASIN の取得
  const asinId = document.getElementById('ASIN'); 
  const asin = asinId ? asinId.value : document.getElementsByName('ASIN.0')[0].value;

  //登録情報欄を取得
  let detail = document.getElementById('detailBullets_feature_div');
  if (!detail) {
      const subdoc = document.getElementById("product-description-iframe").contentWindow.document;
      detail = subdoc.getElementById("detailBullets_feature_div");
  }

  const pubdata = detail.innerText.split(/\n/);
  const publish_date = pubdata[2].slice(10);  //出版日付

  const url = 'https://www.amazon.co.jp/exec/obidos/ASIN/'+asin+'/cluboshiire-22/';
  const link = '[' + title + '](' + url + ')';

  // 選択範囲を取得する
  let selection = window.getSelection().toString();  // 選択範囲を文字列として取得
  if (selection) { // 選択範囲があるとき
    selection = select.replace(/(\W+)( )(\W+)/g,'$1$3'); // 字間に時々紛れている半角スペースを除去
    selection = "\n> " + select.replace(/\n/g,'\n> '); // 行ごとに引用の「>」を付与
  } else { // 選択範囲が空のとき
    selection = "";
  };

  const imgBlkFront = document.getElementById("imgBlkFront");
  const ebooksImgBlkFront = document.getElementById("ebooksImgBlkFront");
  const imageurl = imgBlkFront ? imgBlkFront.getAttribute("src") : ebooksImgBlkFront.getAttribute("src");
  
  var pub = []; //著者情報の処理
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
  // var h1title = '# 『' + title + '』\n\n';
  var mdimage = '\n![|100](' + imageurl + ')\n';

  // 表示させたい項目
  const lines = '---\ntitle: ' + title + '\nauthor: ' + simpleAuthors+ '\n' + 'asin: ' + asin + '\n' + 'publish_date: ' +  publish_date + '\n---\n' + link + '\n' + pub.join(' ') + mdimage + '\n' + selection + '\n';
  
  document.getElementById('bookDescription_feature_div').innerHTML = '<textarea style="height:500px">' + lines + '</textarea>';
}