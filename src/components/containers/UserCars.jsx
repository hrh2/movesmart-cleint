import React from 'react'
import CarCard from '../cards/UserCar-card'

// data

export default function UserCars({cars}) {
  // console.log(cars)
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
          {cars.map((car) => (
            <CarCard car={car} key={car._id} />
          ))}
    </div>
  )
}
