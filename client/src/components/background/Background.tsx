import React from 'react';
import classes from './Background.module.scss';

const Background: React.FC = () => {
  return (
    <>
      <div style={{ width: "100%", height: "200%", position: "absolute", top: "-20%", left: "-20%", transform: "rotate(-25deg)", display: "flex", alignContent: "right", flexDirection: "column", opacity: .1 }}>
        <div className={classes.div1} />
        <div className={classes.div2} />
        <div className={classes.div3} />
        <div className={classes.div4} />
        <div className={classes.div1} />
        <div className={classes.div2} />
        <div className={classes.div3} />
        <div className={classes.div4} />
        <div className={classes.div1} />
        <div className={classes.div2} />
        <div className={classes.div3} />
        <div className={classes.div4} />
        <div className={classes.div1} />
        <div className={classes.div2} />
        <div className={classes.div3} />
        <div className={classes.div4} />
        <div className={classes.div1} />
        <div className={classes.div2} />
        <div className={classes.div3} />
        <div className={classes.div4} />
      </div>
      <div style={{ width: "100%", height: "100%", position: "absolute", bottom: "-110%", left: "0", transform: "rotate(-25deg)", display: "flex", alignContent: "right", flexDirection: "column" }}>
        
      </div>
    </>
  )
}

export default Background;