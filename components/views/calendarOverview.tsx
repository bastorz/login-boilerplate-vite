import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Calendar from "./calendar";
import React from "react";
import { supabase } from "../../utils/supabase/entities/supabaseClient";

export interface AllEvents {
  event_id?: string;
  classroom_id?: string;
  challenge_id?: string;
  event_day?: string;
  classroom_date?: string;
  challenge_day?: string;
  type: "event" | "classroom" | "challenge";
}

interface ClassroomSchedule {
  day: string;
  classroomDate: string;
  scheduledSlot: string;
  classroom_completed: boolean;
}

interface RegisteredInClassroom {
  classroom_id: string;
  classroom_slot?: string; // Puede ser opcional si es posible que falte
  classroom_type: "program" | "single"; // Tipos literales para classroom_type
  participant_id: string;
  classroom_weekday: string[];
  classroom_end_date: string;
  classroom_schedule: ClassroomSchedule[];
  classroom_start_date: string;
}

interface RegisteredInEvent {
  event_id: string;
  event_date: string;
  event_status: string;
  event_end_time: string;
  payment_status: "paid" | "unpaid"; // Tipo literal para payment_status
  event_start_time: string;
  registration_date: string;
}

interface RegisteredInChallenge {
  created_at: string;
  challenge_id: string;
  challenge_day: string;
  payment_status: "paid" | "unpaid"; // Tipo literal para payment_status
}

interface EventsData {
  registered_in_events: RegisteredInEvent[] | null;
  registered_in_classrooms: RegisteredInClassroom[] | null;
  registered_in_challenges: RegisteredInChallenge[] | null;
}

const CalendarOverview = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventsData | null>(null);
  const [allEvents, setAllEvents] = useState<AllEvents[]>([]);
  const [showFutureEvents, setShowFutureEvents] = useState(true);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      getAllEventsByUserId();
    }
  }, [user]);

  useEffect(() => {
    combineAndSortEvents();
  }, [events]);

  const getUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
    } else {
      setUser(data.user);
    }
  };

  const getAllEventsByUserId = async () => {
    try {
      console.log("user from events", user);
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "registered_in_events, registered_in_classrooms, registered_in_challenges"
        )
        .eq("user_id", user?.id);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const {
          registered_in_events,
          registered_in_classrooms,
          registered_in_challenges,
        } = data[0];

        console.log("getAllEventsByUserId", data[0]);

        // Verificar si todos los campos son null
        if (
          registered_in_events === null &&
          registered_in_classrooms === null &&
          registered_in_challenges === null
        ) {
          setEvents({
            registered_in_events: [],
            registered_in_classrooms: [],
            registered_in_challenges: [],
          });
          setNoEvents(true); // Establecer noEvents en true
        } else {
          // Construir el array combinado de eventos
          const combinedEvents: EventsData = {
            registered_in_events: registered_in_events ?? [],
            registered_in_classrooms: registered_in_classrooms ?? [],
            registered_in_challenges: registered_in_challenges ?? [],
          };

          setEvents(combinedEvents);
          setNoEvents(false); // Establecer noEvents en false
        }
      } else {
        console.log("No events found for user");
        setEvents({
          registered_in_events: [],
          registered_in_classrooms: [],
          registered_in_challenges: [],
        });
        setNoEvents(true); // Establecer noEvents en true
      }
    } catch (error) {
      console.log("Error - getAllEventsByUserId", error);
    }
  };

  const combineAndSortEvents = () => {
    if (
      !events ||
      !events.registered_in_events ||
      !events.registered_in_classrooms ||
      !events.registered_in_challenges
    ) {
      setAllEvents([]);
      return;
    }

    const {
      registered_in_events,
      registered_in_classrooms,
      registered_in_challenges,
    } = events;

    const combinedEvents: AllEvents[] = [
      ...registered_in_events.map(
        (event: RegisteredInEvent): AllEvents => ({
          type: "event",
          event_id: event.event_id,
          event_day: event.event_date,
          // Otros campos de RegisteredInEvent que desees incluir en AllEvents
        })
      ),
      ...registered_in_classrooms.map(
        (event: RegisteredInClassroom): AllEvents => ({
          type: "classroom",
          classroom_id: event.classroom_id,
          classroom_date: event.classroom_start_date,
          // Otros campos de RegisteredInClassroom que desees incluir en AllEvents
        })
      ),
      ...registered_in_challenges.map(
        (event: RegisteredInChallenge): AllEvents => ({
          type: "challenge",
          challenge_id: event.challenge_id,
          challenge_day: event.challenge_day,
          // Otros campos de RegisteredInChallenge que desees incluir en AllEvents
        })
      ),
    ];

    combinedEvents.sort((a, b) => {
      const dateA = new Date(
        a.event_day ?? a.classroom_date ?? a.challenge_day ?? ""
      ).getTime();
      const dateB = new Date(
        b.event_day ?? b.classroom_date ?? b.challenge_day ?? ""
      ).getTime();
      return dateA - dateB;
    });

    setAllEvents(combinedEvents);
  };

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(
      event.event_day ?? event.classroom_date ?? event.challenge_day ?? 0
    );
    const currentDate = new Date();
    return showFutureEvents
      ? eventDate >= currentDate
      : eventDate < currentDate;
  });

  return (
    <div className="h-auto w-auto overflow-y-auto pb-10">
      <div className="flex flex-col space-y-20">
        <Calendar events={allEvents} />
      </div>
      <div>
        {!noEvents ? (
          <div className="flex w-full space-x-4 items-center justify-center pb-10">
            <button
              className="p-3 bg-green-500  rounded-lg font-bold"
              onClick={() => setShowFutureEvents(true)}
            >
              Por venir
            </button>
            <button
              className="p-3 bg-orange-500  rounded-lg font-bold"
              onClick={() => setShowFutureEvents(false)}
            >
              Pasados
            </button>
          </div>
        ) : (
          <p className="flex w-full space-x-4 items-center justify-center pb-10 text-red-500 text-lg">
            No tienes ningún evento asignado.
          </p>
        )}

        <ul className="flex flex-col items-center justify-center">
          {filteredEvents.map((event, index) => (
            <li
              key={`${
                event.event_id || event.classroom_id || event.challenge_id
              }_${index}`}
              className={`event-type-${event.type} w-[400px]`}
            >
              {event.event_id && (
                <p className="p-3 bg-green-500">
                  Tienes un evento: {event.event_day}
                </p>
              )}
              {event.classroom_id && (
                <p className="p-3 bg-orange-500">
                  Tienes una clase: {event.classroom_date}
                </p>
              )}
              {event.challenge_id && (
                <p className="p-3 bg-blue-500">
                  Tienes un desafio: {event.challenge_day}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarOverview;
