export default (object, missile) => {
    const bottomOfMissile = missile.position.y + missile.height;
    const topOfMissile = missile.position.y;

    const topOfObject = object.position.y;
    const bottomOfObject = object.position.y + object.height;
    const leftSideOfObject = object.position.x;
    const rightSideOfObject = object.position.x + object.width;
    const isCollision = (
        bottomOfMissile >= topOfObject &&
        topOfMissile <= bottomOfObject && 
        missile.position.x + missile.width >= leftSideOfObject &&
        missile.position.x <= rightSideOfObject
    )

    return isCollision;
}