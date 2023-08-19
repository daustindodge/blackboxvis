import PropTypes from "prop-types";

const Bar = ({height, width}) =>
{
    return (
        <div style={{
            height: `${height}`,
            width: `${width}`,
            backgroundColor: "#d2c2b0",
            borderTopLeftRadius: "2px",
            borderTopRightRadius: "2px",
            marginRight: "2px",
            marginLeft: "2px",
            alignSelf: "baseline",
            marginTop: "auto"
            }}
        />
    )
}

Bar.propTypes = { height: PropTypes.string, width: PropTypes.string };

export default Bar;