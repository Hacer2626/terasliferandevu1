import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const salons = ["Mavi Salon", "Kırmızı Salon", "VIP Salon"];
const times = ["Gündüz", "Gece"];

export default function RandevuPaneli() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: times[0],
    count: "",
    salon: salons[0],
  });
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState(times[0]);

  const addAppointment = () => {
    const existing = appointments.filter(
      (r) => r.date === form.date && r.salon === form.salon && r.time === form.time
    );
    if (existing.length >= 1) {
      alert("Bu salonda bu tarih ve zaman dilimi için zaten bir randevu alınmış.");
      return;
    }
    setAppointments([...appointments, form]);
    setForm({ name: "", date: "", time: times[0], count: "", salon: salons[0] });
  };

  const filtered = appointments.filter(
    (r) => r.date === filterDate && r.time === filterTime
  );
  const filledSalons = [...new Set(filtered.map((r) => r.salon))];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Teraslife Randevu</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Yeni Randevu Ekle</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Yeni Randevu Ekle</DialogTitle>
          <div className="space-y-3">
            <input
              className="w-full border p-2 rounded"
              placeholder="İsim"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <select
              className="w-full border p-2 rounded"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            >
              {times.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <input
              className="w-full border p-2 rounded"
              placeholder="Kişi Sayısı"
              value={form.count}
              onChange={(e) => setForm({ ...form, count: e.target.value })}
            />
            <select
              className="w-full border p-2 rounded"
              value={form.salon}
              onChange={(e) => setForm({ ...form, salon: e.target.value })}
            >
              {salons.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Button onClick={addAppointment}>Kaydet</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {appointments.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-1">
              <p><strong>{r.name}</strong> - {r.date} / {r.time}</p>
              <p>{r.count} kişi - {r.salon}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Randevu İstatistikleri</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
          >
            {times.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        {filterDate ? (
          <div>
            <p>
              <strong>{filterDate}</strong> - <strong>{filterTime}</strong> için dolu salonlar:
            </p>
            <ul className="list-disc list-inside">
              {filledSalons.length > 0 ? (
                filledSalons.map((salon) => <li key={salon}>{salon}</li>)
              ) : (
                <li>Henüz dolu salon yok</li>
              )}
            </ul>
          </div>
        ) : (
          <p>Tarih seçerek başlayın.</p>
        )}
      </div>
    </div>
  );
}
