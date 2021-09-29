function noTouch() {
    Pts.namespace(this);

    var space = new CanvasSpace("#pt").setup({
    bgcolor: "#252934",
    resize: true,
    retina: true
    });
    var form = space.getForm();
    form.stroke(false);

    // Constants
    let pts = new Group();
    let distance = 70;

    space.add({

    // Initialize points
    start: (bound) => {
        createPts();
    },

    animate: (time, ftime) => {
        pts.forEach((p, i) => {
            // Falling animation
            if (p.y < space.innerBound.height + 10) {
                p.add(0, p.random * 0.3)
            } else {
                p.to(p.x, -10)
            }

            // Check if pointer is on the board
            if (space.pointer.x < space.innerBound.width - 1 &&
                space.pointer.y < space.innerBound.height - 1 &&
                space.pointer.x > 0 && space.pointer.y > 0 &&
                space.pointer.x != space.innerBound.width / 2 &&
                space.pointer.y != space.innerBound.height / 2
            ) {
                // If a point comes within range of the cursor, move the point
                let diff = p.$subtract(space.pointer);
                let mag = diff.magnitude();
                if (mag < distance) {
                    let vect = diff.$multiply(distance / mag);
                    let pNew = space.pointer.$add(vect);
                    form.fill("rgba(255, 63, 143, " + p.random * 1 + ")").point(pNew, (1 - p.random) * 15, "circle")
                } else {
                    form.fill("rgba(4, 194, 201, " + p.random * 0.5 + ")").point(p, (1 - p.random) * 15, "circle")
                }
            } else {
                form.fill("rgba(4, 194, 201, " + p.random * 0.5 + ")").point(p, (1 - p.random) * 15, "circle")
            }
        })
    },

    resize: () => {
        clearTimeout(-1);
        setTimeout(() => {
            createPts();
        }, 500);
    }

    });

    space.bindMouse().bindTouch().play();

    // Create random distribution of points with a random attribute
    // p.random will determine the size, opacity, and fall speed of each point
    function createPts() {
        let count = Math.floor(space.innerBound.width / 1.25);
        pts = Create.distributeRandom(space.innerBound, count);
        pts.forEach((p, i) => {
            p.random = Math.random();
        })
    }
}

noTouch();
