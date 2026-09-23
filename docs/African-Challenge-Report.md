Problem Context: 
EcoDash is based on the challenge of transporting essential supplies while dealing with unreliable electricity infrastructure in South Africa. Loadshedding can temporarily interrupt electricity supply, which can also affect electric vehicle charging and other infrastructure that depends on electricity. This creates an extra challenge for electric delivery vehicles because they need enough battery power to complete their routes. This problem is relevant to sustainable transport because electric vehicles can reduce the use of fuel, but they still depend on reliable charging infrastructure. Recent research on electric vehicles in South Africa identifies unreliable electricity supply, load-shedding and limited charging infrastructure as challenges for electric mobility (Ntombela, 2026). Research also shows that renewable energy, including solar power, can help decrease pressure on the electricity system (LiebenSteiner & Paha, 2026). 

EcoDash solution:
EcoDash models this problem through a solar-powered electric delivery vehicle. The player must deliver essential supplies such as medical equipment or food while managing the vehicle's battery. Charging stations are placed around the map. Some stations can become available during a loadshedding event, which means the player should plan another route or save enough battery to reach another station. Solar-powered charging stations can provide alternative sources of energy. The aim isn't to recreate South Africa's electricity system exactly, but to create a simple simulation of how energy availability can affect delivery planning.

Mathematical Model:
Maths will be used to control the movement of the vehicle, calculate distances and manage battery consumption. The vehicle's movement will use an x and y velocity:
v= (vx, vy)
The distance between two points can be calculated using:
d = √((x₂ − x₁)² + (y₂ − y₁)²)
This can be used to determine the distance between the vehicle and a delivery location or charging station.
Battery consumption will decrease as the vehicle travels for longer distances or moves through difficult terrain or bad weather.
Collision detection will also use the positions and dimensions of objects on the Canvas. The vehicle will be checked against obstacles such as damaged roads, constructions areas or other objects. If the objects overlap, a collsions will be detected. The mathematical concepts will allow EcoDash to simulate movement, navigation, resource management and environmental challenges.

Conclusion: 
EcoDash uses a South African electricity and logistics challenge as part of its gameplay. By combining electric transport, renewable energy and load-shedding with movement and resource management, the simulation demonstrates how technology can be used to explore real-world logistics problems.

References:
Liebensteiner, M. & Paha, J. (2026). Renewable Investment and Electricity Rationing: Evidence from South Africa. CESifo Working Paper No. 12540. https://doi.org/10.65864/so3tkifksi

Ntombela, M. (2026). Challenges of Electric Vehicle Integration into the South African Power Grid. World Electric Vehicle Journal, 17(6), 321. https://doi.org/10.3390/wevj17060321
