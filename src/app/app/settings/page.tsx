"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, notify, logout } = useApp();
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? "");
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState(true);
  const [emailOn, setEmailOn] = useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-4xl">Settings</h1>
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="font-medium">Account</h2>
        <div className="mt-4 space-y-4">
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <Input value={user?.email ?? ""} readOnly />
          </Field>
          <p className="text-sm text-slate">Plan: {user?.plan}</p>
          <Button onClick={() => notify("Account details stored locally for this demo.")}>Save account</Button>
        </div>
      </section>
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="font-medium">Preferences</h2>
        <label className="mt-4 flex items-center justify-between text-sm">
          Email notifications
          <input type="checkbox" checked={emailOn} onChange={(e) => setEmailOn(e.target.checked)} />
        </label>
        <label className="mt-3 flex items-center justify-between text-sm">
          Hide draft profiles from QR picker
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
        </label>
        <Button className="mt-4" variant="outline" onClick={() => notify("Preferences updated.")}>
          Save preferences
        </Button>
      </section>
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="font-medium">Sharing & privacy</h2>
        <p className="mt-2 text-sm text-slate">
          Public pages only show enabled buttons. Analytics in this prototype are fictional.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => notify("Sharing defaults saved.")}>
          Save sharing defaults
        </Button>
      </section>
      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="font-medium">Danger zone</h2>
        <p className="mt-2 text-sm text-slate">Deletes the demo session from this browser.</p>
        <Button className="mt-4" variant="danger" onClick={() => setOpen(true)}>
          Delete account
        </Button>
      </section>
      <Modal
        open={open}
        title="Delete demo account?"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                logout();
                notify("Demo session cleared.");
                router.push("/");
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        This logs you out of the prototype. Seed profiles return the next time you sign in on a fresh session.
      </Modal>
    </div>
  );
}
