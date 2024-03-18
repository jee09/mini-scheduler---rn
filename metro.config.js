const { getDefaultConfig } = require("expo/metro-config");
const { resolver: defaultResolver } = getDefaultConfig(__dirname);

// SVG Transformer 설정 추가
const svgTransformer = require("react-native-svg-transformer");

// Metro configuration을 커스터마이징
const config = getDefaultConfig(__dirname);

// 기존 assetExts 배열에서 'svg' 확장자 제거
const assetExts = defaultResolver.assetExts.filter((ext) => ext !== "svg");

// sourceExts 배열에 'svg' 확장자 추가
config.resolver = {
  ...defaultResolver,
  assetExts,
  sourceExts: [...defaultResolver.sourceExts, "svg"],
};

// transformer 설정에 react-native-svg-transformer 사용 지정
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

module.exports = config;
