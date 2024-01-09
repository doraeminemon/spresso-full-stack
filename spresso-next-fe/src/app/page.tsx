'use client'
import { useState } from "react"
import useSWR from "swr"

export default function Home() {
  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR('http://localhost:4200/product', fetcher)
  let products = []
  if (data) {
    products = data.map((product: any) => {
      return (
        <div
          key={product.id}
          className="bg-blue-300 rounded-md px-4 py-2 hover:bg-blue-600"
        >
          <div>
            {product.name}
          </div>
          <div>
            <label>Description</label>
            {product.description}
          </div>
          <div>
            ${product.price}
          </div>
        </div>
      )
    })
  }
  return (
    <main className='bg-white min-w-screen min-h-screen'>
      <div className="px-6 py-4 grid gap-6 w-full flex-col">
        {products}
      </div>
    </main>
  )
}