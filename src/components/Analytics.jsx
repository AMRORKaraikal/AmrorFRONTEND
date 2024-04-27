import { useState, useEffect } from 'react'
import { BarChart, HorizontalBarGraph } from './Charts'
import { month } from './data'

const MonthlyAnalytics = () => {
	// Sample data structure
	const [monthlyData, setMonthlyData] = useState([])
	const [data, setData] = useState({})
	const [selmonth, setMonth] = useState('')
	const y = new Date()
	const [selyear, setYear] = useState(y.getFullYear())
	const [ready, setReady] = useState(false)

	// Simulated API call to fetch monthly data
	const fetchMonthlyData = async () => {
		//console.log(selmonth, selyear)
		const data = await fetch('https://amrorbackend-uvt9.onrender.com/report', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				month: selmonth,
				year: selyear,
			}),
		})
		const jsonData = await data.json()
		//console.log(jsonData.data)
		setMonthlyData(jsonData.data)
		setData(jsonData.micro)
	}
	useEffect(() => {
		if (monthlyData.length > 0 && Object.keys(data).length > 0) {
			//console.log(monthlyData)
			setReady(true)
		}
	}, [monthlyData, data])

	return (
		<div className="mt-10 ml-10">
			<div className="flex gap-x-5">
				<label className="text-xl text-gray-800">Month:</label>
				<select
					id="microbe_dropdown"
					className="w-48 outline rounded-md"
					value={selmonth}
					onChange={(e) => setMonth(e.target.value)}>
					<option value="">Select</option>
					{month.map((loc, index) => {
						return (
							<option key={index} value={loc}>
								{loc}
							</option>
						)
					})}
				</select>

				<label className="text-xl text-gray-800">YEAR:</label>
				<input
					id="year"
					type="number"
					placeholder="2024"
					value={selyear}
					onChange={(e) => setYear(e.target.value)}
					className="p-2 border border-gray-300 rounded-md"
					required={true}
				/>
				<button
					id="submit-button"
					onClick={fetchMonthlyData}
					className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
					Check
				</button>
			</div>
			<h2>Monthly Report: Microorganism Analysis</h2>
			{ready && (
				<>
					<HorizontalBarGraph data={data} />
					{monthlyData.map((microbe, index) => {
						return <BarChart data={microbe} key={index} />
					})}
				</>
			)}
		</div>
	)
}

export default MonthlyAnalytics
