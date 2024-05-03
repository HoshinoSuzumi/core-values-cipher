const assert = (...expression: any[]) => {
  const len = expression.length;
  const msg =
    typeof expression[len - 1] === "string"
      ? expression[len - 1]
      : "assertion failed";
  for (let exp of expression) {
    if (!exp) throw new Error(msg);
  }
};

const random_bool = () => Math.random() >= 0.5;

const CHARSET = "富强民主文明和谐自由平等公正法治爱国敬业诚信友善";

const str2utf8 = (str: string) => {
  const notEncoded = /[A-Za-z\d\-_.!~*'()]/g;
  const str1 = str.replace(notEncoded, (c) => c.codePointAt(0)!.toString(16));
  let str2 = encodeURIComponent(str1);
  return str2.replace(/%/g, "").toUpperCase();
};

const utf82str = (utf8: any) => {
  assert(typeof utf8 === "string", "invalid utf8 array");
  const l = utf8.length;
  assert((l & 1) === 0);
  const split = [];
  for (let i = 0; i < l; i++) {
    if ((i & 1) === 0) {
      split.push("%");
    }
    split.push(utf8[i]);
  }
  return decodeURIComponent(split.join(""));
};

const hex2duo = (hex: string) => {
  assert(typeof hex === "string");
  const duo = [];
  for (let c of hex) {
    const n = Number.parseInt(c, 16);
    if (n < 10) {
      duo.push(n);
    } else {
      if (random_bool()) {
        duo.push(10);
        duo.push(n - 10);
      } else {
        duo.push(11);
        duo.push(n - 6);
      }
    }
  }
  return duo;
};

const duo2hex = (duo: number[]) => {
  assert(duo instanceof Array);
  const hex = [];
  const l = duo.length;
  let i = 0;
  while (i < l) {
    if (duo[i] < 10) {
      hex.push(duo[i]);
    } else {
      if (duo[i] === 10) {
        i++;
        hex.push(duo[i] + 10);
      } else {
        i++;
        hex.push(duo[i] + 6);
      }
    }
    i++;
  }
  return hex.map((v) => v.toString(16).toUpperCase()).join("");
};

const encode = (text: string) => {
  return hex2duo(str2utf8(text))
    .map((d) => CHARSET[2 * d] + CHARSET[2 * d + 1])
    .join("");
};

const decode = (cipher: string) => {
  const duo = [];
  for (let c of cipher) {
    const i = CHARSET.indexOf(c);
    if (i === -1) {
    } else if (i & 1) {
    } else {
      duo.push(i >> 1);
    }
  }
  const hexs = duo2hex(duo);
  assert((hexs.length & 1) === 0);
  let str;
  try {
    str = utf82str(hexs);
  } catch (e) {
    throw e;
  }
  return str;
};

export { encode as encrypt, decode as descrypt };
