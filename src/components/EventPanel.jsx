import {useState, useEffect} from 'react'
import {
  Dialog,DialogTrigger,DialogContent,
  DialogHeader,DialogTitle,DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function EventPanel({ selectedDate, events, setEvents }) {
  const [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const handleAddEvent = () => {
    if (!eventName || !startTime || !endTime) {
      alert("Please fill out all required fields.");
      return;
    }

    if (startTime >= endTime) {
      alert("Start time must be earlier than end time.");
      return;
    }
    const formattedDate = selectedDate.toISOString().split("T")[0];
    console.log(formattedDate);
    const dayEvents = events[formattedDate] || [];
    const newEvent = { name: eventName, startTime, endTime, description };
    setEvents({ ...events, [formattedDate]: [...dayEvents, newEvent] });
    setIsOpen(false);
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  const formattedDate = selectedDate?.toISOString().split("T")[0];
  const dayEvents = events[formattedDate] || [];

  // Export to JSON file
  const exportToJSON = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const monthEvents = events[formattedDate] || [];
    const blob = new Blob([JSON.stringify(monthEvents)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `events-${formattedDate}.json`;
    a.click();
  };

  // Export to CSV file
  const exportToCSV = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const monthEvents = events[formattedDate] || [];
    const csvContent = [
      ["Event Name", "Start Time", "End Time", "Description"],
      ...monthEvents.map((event) => [
        event.name,
        event.startTime,
        event.endTime,
        event.description || "",
      ]),
    ].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `events-${formattedDate}.csv`;
    a.click();
  };
  const handleDeleteEvent = (eventToDelete) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const dayEvents = events[formattedDate] || [];

    // Filtering the event that needs to be deleted
    const updatedDayEvents = dayEvents.filter((event) => event !== eventToDelete);
    const updatedEvents = { ...events, [formattedDate]: updatedDayEvents };

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">
        Events for {selectedDate ? selectedDate.toLocaleDateString() : "Select a Day"}
      </h3>
      {dayEvents.length === 0 ? (
        <p>No events scheduled for this day.</p>
      ) : (
        <ul className="space-y-4">
          {dayEvents.map((event, index) => (
            <div key = {index} className='flex'>
              <li className="border-b pb-2 hover:bg-gray-100">
                <strong>{event.name}</strong> ({event.startTime} - {event.endTime})
                {event.description && <p className="text-sm">{event.description}</p>}
              </li>
              <Button onClick ={()=>handleDeleteEvent(event)}
                  className="mx-5 bg-red-600 text-white hover:bg-red-700">
                Delete Event
              </Button>
            </div>
          ))}
        </ul>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
            Add Event
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill out the details below to add a new event.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <Input
              aria-label="Event Name"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <Input
              type="time"
              aria-label="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              aria-label="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <Textarea
              aria-label="Description"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Save Event</Button>

              {/* Export Buttons */}
              <div className="space-x-1 max-sm:mb-1 max-sm:mx-auto">
                <Button onClick={exportToJSON}>Export to JSON</Button>
                <Button onClick={exportToCSV}>Export to CSV</Button>
              </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}

export default EventPanel;
