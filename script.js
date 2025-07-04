let currentSize = 24;
const content = document.getElementById("content");
const fontSizeDisplay = document.getElementById("fontSizeDisplay");
const wrap = document.querySelector(".wrap");
const scaleSlider = document.getElementById("scaleSlider");
const sliderLabel = document.getElementById("sliderLabel");
const spacingPopup = document.getElementById("spacingPopup");
const letterSpacingValue = document.getElementById("letterSpacingValue");
const lineHeightValue = document.getElementById("lineHeightValue");
const letterSpacingInput = document.getElementById("letterSpacingInput");
const lineHeightInput = document.getElementById("lineHeightInput");
const resetScaleBtn = document.getElementById("resetScaleBtn");
const editToggleBtn = document.getElementById("editToggleBtn");
const fontWeightsByFont = {
  "SM3 세명조": ["400"],
  "SM3 중명조": ["400"],
  "SM3 신명조": ["400", "700"],
  "SM3 신신명조": ["300", "400", "700"],
  "SM3 태명조": ["400"],
  "SM3 견출명조": ["400"],
  "SM 세명조": ["400"],
  "SM 중명조": ["400"],
  "SM 순명조": ["400"],
  "SM 신명조": ["400", "700"],
  "SM 신신명조": ["400", "500"],
  "SM 태명조": ["400"],
  "SM 견출명조": ["400"],
  "SM3 세고딕": ["400"],
  "SM3 신중고딕": ["300","400", "500"],
  "Kopub": ["300", "400", "700"],
  "Noto Sans KR": ["300", "400", "500", "600", "700", "900"],
  "아티클": [ "400"],
  "Pretendard": ["300", "400", "500", "600", "700", "900"],
  "onul 구보씨": ["400",],
  "onul 도담": ["300", "400"],
  "onul 숨": ["400"],
  "onul 온하루 sans": ["400"],
  "onul 온하루 serif": ["400"],
  "onul 흑단": ["400","700", "900"],
  "onul 제야": ["400"]
  
  
  // 폰트 이름과 지원하는 웨이트를 매핑한 객체
  //폰트 웨이트
};

const defaultText = `세종임금님이 만든 ‘한글’은 나라의 공식 글자가 아니었습니다. 신하들의 반대가 거셌기 때문입니다. 그래서 한글은 궁과 여성과 불교를 중심으로 서서히 퍼졌습니다. 한글이 만들어진 지 400년 정도 흐른 뒤에, 한글 소설이 온 나라에 유행했습니다. 한글이 대중 속에 자리를 잡았습니다.

      나라의 기운이 쇠하면서 주체적인 모습을 보이기 위해서 고종임금님은 1894년 월에 한글을 나라의 공식 글자로 발표했습니다. 그러나 결국 나라는 빼앗겼고 한글은 사라질 위기에 처했습니다. 뜻 있는 사람들이 한글로 민족의식을 모았고, 한글을 지켜냈습니다. 한글은 민족(나라)을 하나로 묶어주는 역할을 했습니다.

      나라를 찾은 지 몇 해 되지 않아 일어난 전쟁과 전쟁 복구 중에는 생존에 집중해야 했습니다. 또 그 뒤 오랫동안은 잘살아 보겠다는 일념으로 한글문화를 살필 겨를이 없었습니다. 그 사이 몇몇 한글 교육에 힘쓴 분들과 뛰어난 조형감각을 갖춘 분들에 의해서, 한글 조형은 아주 조금씩 나아졌습니다.

      이제 한글을 빼앗길 걱정이나 생명의 위협으로부터 상당히 벗어났지만, 여전히 우리는 더 잘 살아야 한다는 마음이 가득합니다. 저는 한글 시각 문화가 백 년 전보다 크게 나아지지 않았다고 느낍니다.

      요즘 발표되는 다양한 한글 조형을 보면 한글 시각 문화가 꽃핀 듯하지만, 아직 우리가 무엇을 하고 있는지 어디로 나아가야 하는지, 선명하지 않아 보입니다. 앞으로 다양한 한글 글자체는 어떻게 해야 만들 수 있는지, 한글 타이포그래피의 정체성은 어떻게 만들어야 할지, 한글의 고유한 멋과 아름다움이 무엇인지, 그럼 나는 어떤 시도를 해야 할지 모르겠습니다. 지금은 그냥 한 사람 한 사람이 각자 가진 능력으로 한글을, 또는 한글로 디자인할 뿐, 함께 나아갈 방향을 고민하고 찾지는 못하고 있습니다.

      푸념 같지만, 150년 전 즈음 한글 소설에 다양한 한글 글자체가 나타났던 때로 돌아가서 어떻게 그런 모습의 글자체를 만들 수 있었는지 보고 싶습니다. 아니면 세로쓰기가 소멸해가던 과정을 보고 싶습니다. 또 아니면 글씨 쓰는 문화를 왜 지키지 못했는지 보고 싶습니다. 이런 것을 보고 돌아와서, 내가 무엇을 놓치고 있는지, 무엇을 해야 하는지 알고 싶습니다. 그러면 자연히 지금 당장 해야 할 일도 알 수 있을 테니까요.`;

let currentFontSize = 24;
let currentLetterSpacing = 0;
let currentLineHeight = 1.6;

let isEditable = false;

// 현재 확대 배율 및 이동 좌표
let scaleValue = 1;
let posX = 0;
let posY = 0;

// 드래그 상태 변수
let isDragging = false;
let startX, startY;

// 글자 크기 표시 업데이트
function updateFontSizeDisplay() {
  fontSizeDisplay.textContent = currentSize + "px";
}

// 글자 크기 증가
function increaseFont() {
  currentSize += 2;
  content.style.fontSize = currentSize + "px";
  updateFontSizeDisplay();
}

// 글자 크기 감소
function decreaseFont() {
  if (currentSize > 10) {
    currentSize -= 2;
    content.style.fontSize = currentSize + "px";
    updateFontSizeDisplay();
  }
}

function toggleSpacingPopup() {
  spacingPopup.classList.toggle("hidden");
}

// 자간 입력 시 변경 적용
letterSpacingInput.addEventListener("input", () => {
  let value = parseFloat(letterSpacingInput.value);
  if (!isNaN(value)) {
    currentLetterSpacing = Math.max(-5, Math.min(20, value));
    content.style.letterSpacing = currentLetterSpacing + "px";
    letterSpacingInput.value = currentLetterSpacing;
  }
});

// 행간 입력 시 변경 적용
lineHeightInput.addEventListener("input", () => {
  let value = parseFloat(lineHeightInput.value);
  if (!isNaN(value)) {
    currentLineHeight = Math.max(0.5, Math.min(5, value));
    content.style.lineHeight = currentLineHeight;
    lineHeightInput.value = currentLineHeight.toFixed(1);
  }
});

function changeLetterSpacing(amount) {
  currentLetterSpacing = Math.max(
    -5,
    Math.min(20, currentLetterSpacing + amount)
  );
  content.style.letterSpacing = currentLetterSpacing + "px";
  letterSpacingInput.value = currentLetterSpacing;
}

function changeLineHeight(amount) {
  currentLineHeight = Math.max(0.5, Math.min(5, currentLineHeight + amount));
  content.style.lineHeight = currentLineHeight;
  lineHeightInput.value = currentLineHeight.toFixed(1);
}

function changeFontWeight(weight) {
  content.style.fontWeight = weight;
}

editToggleBtn.addEventListener("click", () => {
  isEditable = !isEditable;
  content.contentEditable = isEditable;
  editToggleBtn.textContent = isEditable ? "편집 완료" : "편집 시작";
  if (isEditable) {
    content.style.outline = "1px dashed #aaa";
  } else {
    content.style.outline = "none";
  }
});

// 폰트 변경
function changeFont(fontName) {
  content.style.fontFamily = fontName;
}

const fontWeightSelector = document.getElementById("fontWeightSelector");
fontWeightSelector.addEventListener("change", (e) => {
  changeFontWeight(e.target.value);
});

document.getElementById("fontSelector").addEventListener("change", (e) => {
  const fontName = e.target.value;
  changeFont(fontName);
  updateFontWeightOptions(fontName);
});

function updateFontWeightOptions(fontName) {
  const fontWeightSelector = document.getElementById("fontWeightSelector");
  const weights = fontWeightsByFont[fontName] || ["400"]; // 없으면 기본 400

  // 기존 옵션 삭제
  fontWeightSelector.innerHTML = "";

  // 지원 웨이트만 옵션으로 추가
  weights.forEach((weight) => {
    let label = weight;
    switch (weight) {
      case "100":
        label = "Thin (100)";
        break;
      case "300":
        label = "Light (300)";
        break;
      case "400":
        label = "Regular (400)";
        break;
      case "500":
        label = "Medium (500)";
        break;
      case "600":
        label = "Semi-Bold (600)";
        break;
      case "700":
        label = "Bold (700)";
        break;
      case "900":
        label = "Black (900)";
        break;
    }
    const option = document.createElement("option");
    option.value = weight;
    option.textContent = label;
    fontWeightSelector.appendChild(option);
  });

  // 기본값 설정 (처음 옵션 선택)
  fontWeightSelector.value = weights[0];
  changeFontWeight(weights[0]);
}

// transform 적용 함수 (이동 + 확대)
function updateTransform() {
  wrap.style.transform = `translate(${posX}px, ${posY}px) scale(${scaleValue})`;
}

// 배율 적용 및 슬라이더 라벨 갱신
function applyScale(value) {
  scaleValue = value / 100;
  updateTransform();
  wrap.style.transformOrigin = "center center";
  sliderLabel.textContent = `${Math.round(value)}%`;
}

// 슬라이더 input 이벤트 → 배율 적용
scaleSlider.addEventListener("input", (e) => {
  applyScale(e.target.value);
});

// 마우스 휠 이벤트 → 확대/축소 (중앙 기준)
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    let delta = -e.deltaY;
    let current = parseInt(scaleSlider.value);
    let newValue = Math.min(5000, Math.max(100, current + delta * 0.2));
    scaleSlider.value = newValue;
    applyScale(newValue);
  },
  { passive: false }
);

// 드래그 시작 이벤트
wrap.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
  wrap.style.cursor = "grabbing";
});

// 드래그 중 이벤트
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  updateTransform();
});

// 드래그 종료 이벤트
window.addEventListener("mouseup", () => {
  isDragging = false;
  wrap.style.cursor = "grab";
});

// 리셋 버튼 클릭 시 배율과 위치 초기화
resetScaleBtn.addEventListener("click", () => {
  scaleSlider.value = 100;
  posX = 0;
  posY = 0;
  applyScale(100);
  updateTransform();
  currentSize = 24; // 폰트 크기 초기화
  content.style.fontSize = currentSize + "px"; // 폰트 크기 적용
  updateFontSizeDisplay(); // 폰트 크기 표시 갱신
  updateTransform(); // 위치와 스케일 동시 반영
  applyScale(100); // 슬라이더 초기화
  currentLetterSpacing = 0;
  currentLineHeight = 1.6;
  content.style.letterSpacing = currentLetterSpacing + "px";
  content.style.lineHeight = currentLineHeight;
  letterSpacingInput.value = currentLetterSpacing;
  lineHeightInput.value = currentLineHeight.toFixed(1);
  content.innerText = defaultText;
  updateFontWeightOptions(document.getElementById("fontSelector").value);
  content.style.fontFamily = "SM3 세명조"; // 기본 폰트로 설정
  document.getElementById("fontSelector").value = "SM3 세명조"; // 폰트 선택 초기화
});

// 초기 표시 세팅
updateFontWeightOptions(document.getElementById("fontSelector").value);
updateFontSizeDisplay();
applyScale(scaleSlider.value);
